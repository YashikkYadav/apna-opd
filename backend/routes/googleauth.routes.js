const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();
const googlekeys = require('../models/googlekeys')
const router = express.Router();

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

// Create OAuth2 client
function createOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
}

// === Route 1: Get consent URL ===
router.get("/auth-url", (req, res) => {
  const oauth2Client = createOAuth2Client();
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // ensure refresh_token is returned
    scope: SCOPES,
  });
  res.redirect(url);
});

// === Route 2: OAuth2 callback ===
router.get("/oauth2callback", async (req, res) => {
  const oauth2Client = createOAuth2Client();
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("Missing code parameter in callback URL");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    // Normally you’d save tokens.refresh_token securely in DB or .env
    console.log("Tokens received:", tokens);

    const data = {
      message: "OAuth success",
      access_token: tokens.access_token,
      expiry_date: tokens.expiry_date,
      token_type: tokens.token_type,
      scope: tokens.scope,
      refresh_token:tokens.refresh_token
    };

    await googlekeys.updateOne(
      {},              // empty filter → only one doc
      { $set: data },  // update with new data
      { upsert: true } // insert if not exists
    );

    res.json({
      message: "OAuth success",
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
      token_type: tokens.token_type,
      scope: tokens.scope,
    });
  } catch (err) {
    console.error("Error exchanging code for tokens:", err);
    res.status(500).json({ error: "Failed to exchange code" });
  }
});

module.exports = router;
