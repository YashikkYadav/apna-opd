const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const calendar = google.calendar("v3");

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
    access_type: "offline", // 'offline' for refresh token
    scope: SCOPES,
  });
}

async function getTokens(oauth2Client, code) {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
  } catch (error) {
    console.error("Error getting tokens:", error);
    throw error; // Re-throw to be handled by caller
  }
}

/**
 * Creates a Google Meet event on Google Calendar.
 * @param {google.auth.OAuth2} auth - The authenticated OAuth2 client.
 * @param {string} summary - The event summary.
 * @param {string} description - The event description.
 * @param {string} startDateTime - The start date/time in ISO format.
 * @param {string} endDateTime - The end date/time in ISO format.
 * @param {string[]} attendees - Array of attendee email addresses.
 * @returns {Promise<object>} - The created event object.
 */
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
      summary: summary,
      description: description,
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
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
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
      auth: auth,
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

  try {
    const auth = oauth2Client.setCredentials({
      access_token:
        "ya29.a0AW4XtxjYW3rLajbKoaVp9JqQcC4N-UQ2kY7WjmRYXO-R40AGEuwo5V9Yppb2VlGl08ClKBIwsXV3B-2GYoZaWLrU_m7PzeyQq3LSsjucjizDMU1oEWk1r8SFEp3464yhlkWt_E_JL9StbPi73809G70uvU_EhsE3qUkd8hfRaCgYKAeoSARASFQHGX2MibvrtfMLqo86dPgcSt9ZEag0175",
      refresh_token:
        "1//0gd5sJepkrQLFCgYIARAAGBASNwF-L9IrFdnshCvKg2OdFrP7QAVXPxOWz8Cf6lVLsj9KzbtDa1cVkQkiOyyvpyGmBrxLb3q1GO8",
      scope:
        "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly",
      token_type: "Bearer",
      refresh_token_expires_in: 604799,
      expiry_date: 1747847236618,
    });

    const eventSummary = "Google Meet Event Example";
    const eventDescription =
      "This is a test event created with the Google Calendar API and Google Meet.";
    const startDateTime = "2025-05-20T14:00:00-07:00"; 
    const endDateTime = "2025-05-20T15:00:00-07:00";
    const attendees = ["shashlko2002@gmail.com", "shash2002lko@gmail.com"];
    const createdEvent = await createMeetEvent(
      oauth2Client,
      eventSummary,
      eventDescription,
      startDateTime,
      endDateTime,
      attendees
    );
    
    return createdEvent.hangoutLink;
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = {
  getMeetLink,
};
