const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");
const calendar = google.calendar("v3");

// === Your Token Store – Replace with real DB logic ===
const tokenStore = {
  access_token: null,
  expiry_date: null,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN, // Put your permanent refresh token in .env
  save(tokens) {
    this.access_token = tokens.access_token;
    this.expiry_date = tokens.expiry_date;
    // You can persist to a DB here if needed
  },
};

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

const getMeetLink = async function (emails = []) {
  const oauth2Client = createOAuth2Client();

  // Set saved credentials
  oauth2Client.setCredentials({
    refresh_token: tokenStore.refresh_token,
    access_token: tokenStore.access_token,
    expiry_date: tokenStore.expiry_date,
  });

  try {
    // Ensure access token is fresh
    await oauth2Client.getAccessToken();

    // Update token store with latest access token info
    const { access_token, expiry_date } = oauth2Client.credentials;
    tokenStore.save({ access_token, expiry_date });

    // Now create the event
    const eventSummary = "Google Meet Event Example";
    const eventDescription =
      "This is a test event created with the Google Calendar API and Google Meet.";
    const startDateTime = "2025-05-20T14:00:00-07:00";
    const endDateTime = "2025-05-20T15:00:00-07:00";

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

module.exports = {
  getMeetLink,
  getAuthUrl,
  getTokens,
};
