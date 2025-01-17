const axios = require('axios');

const {
  BREVO_USER_NAME,
  BREVO_EMAIL,
  BREVO_API,
  BREVO_API_KEY,
} = require('../config/config');

async function mailFunction(sub, content, email, name) {
  try {
    const options = {
      method: 'POST',
      url: BREVO_API,
      headers: {
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      data: {
        sender: {
          name: BREVO_USER_NAME,
          email: BREVO_EMAIL,
        },
        to: [{ email: email, name: name }],
        htmlContent: `
          <html>
            <head></head>
            ${content}
          </html>
        `,
        subject: sub,
      },
    };

    const response = await axios.request(options);
    console.log('Email sent successfully:', response.data);
    
  } catch (error) {
    console.error('Failed to send email:', error.response ? error.response.data : error.message);
  }
}

module.exports = mailFunction;
