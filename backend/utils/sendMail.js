const axios = require("axios");

/**
 * Generic function to send emails via Brevo API
 * @param {string} recipientEmail - Receiver's email
 * @param {string} recipientName - Receiver's name
 * @param {string} subject - Email subject line
 * @param {string} htmlContent - HTML body of the email
 * @returns {Promise<object>} - Brevo API response
 */
async function sendMail(recipientEmail, recipientName, subject, htmlContent) {
    console.log('asdsBREVO_API_KEY',process.env.BREVO_API_KEY,recipientEmail, recipientName, subject, htmlContent)
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "ApnaOPD",
          email: "admin@apnaopd.com", // must be verified/authenticated in Brevo
        },
        to: [
          {
            email: recipientEmail,
            name: recipientName,
          },
        ],
        subject,
        htmlContent,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY, // keep in .env
          "content-type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending email:", error.response?.data || error.message);
    throw new Error("Failed to send email");
  }
}

module.exports = sendMail;
