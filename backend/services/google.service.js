const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");
const googlekeys = require("../models/googlekeys");
const calendar = google.calendar("v3");

// === Your Token Store – Replace with real DB logic ===
// const tokenStore = {
//   access_token: process.env.ACCESS_TOKEN,
//   expiry_date: process.env.EXPIRY_DATE,
//   refresh_token: process.env.GOOGLE_REFRESH_TOKEN, // Put your permanent refresh token in .env
//   save(tokens) {
//     this.access_token = tokens.access_token;
//     this.expiry_date = tokens.expiry_date;
//     // You can persist to a DB here if needed


//   },
// };

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events.readonly",
  "https://www.googleapis.com/auth/calendar.events",
];

function createOAuth2Client() {
  return new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });
}

function getAuthUrl(oauth2Client) {
  return oauth2Client.generateAuthUrl({
    access_type: "offline", // Needed for refresh_token
    prompt: "consent", // Ensures refresh_token is returned
    scope: SCOPES,
  });
}

async function getTokens(oauth2Client, code) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  } catch (error) {
    console.error("Error getting tokens:", error);
    throw error;
  }
}

const createMeetEvent = async function (
  auth,
  summary,
  description,
  startDateTime,
  endDateTime,
  attendees
) {
  try {
    const event = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "America/Los_Angeles",
      },
      attendees: attendees.map((email) => ({ email })),
      conferenceData: {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    const response = await calendar.events.insert({
      auth,
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

const getMeetLink = async function (time, emails = []) {
  const oauth2Client = createOAuth2Client();
const tokenStore=await googlekeys.findOne()
  oauth2Client.setCredentials({
    refresh_token: tokenStore.refresh_token,
    access_token: tokenStore.access_token,
    expiry_date: tokenStore.expiry_date,
  });

  try {
    await oauth2Client.getAccessToken();

    const { access_token, expiry_date } = oauth2Client.credentials;
    await googlekeys.updateOne(
      {},              // empty filter → only one doc
      {
        $set: {
           expiry_date,
          access_token,

        }
      },  // update with new data
      { upsert: true } // insert if not exists
    );
    tokenStore.save({ access_token, expiry_date });

    const eventSummary = "Google Meet Event Example";
    const eventDescription =
      "This is a test event created with the Google Calendar API and Google Meet.";
    const startDateTime = time;
    const endDateTime = addOneHourToISOString(time);

    const createdEvent = await createMeetEvent(
      oauth2Client,
      eventSummary,
      eventDescription,
      startDateTime,
      endDateTime,
      emails
    );

    return createdEvent.hangoutLink;
  } catch (error) {
    console.error("Error while calling link url:", error);
    throw error;
  }
};

function addOneHourToISOString(isoString) {
  const date = new Date(isoString);
  const newDate = new Date(date.getTime() + 60 * 60 * 1000);
  return newDate.toISOString();
}

module.exports = {
  getMeetLink,
  getAuthUrl,
  getTokens,
};
