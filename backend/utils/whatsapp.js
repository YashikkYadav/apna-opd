const axios = require('axios');

const {
  DOUBLE_TICK_API,
  API_KEY,
} = require('../config/config');

const sendTemplateMessage = async(
  phoneNumber,
  templateName,
  templateLanguage,
  data
) => {
  try {
    const response = await axios.post(
      DOUBLE_TICK_API,
      {
        messages: [
          {
            to: `+91${phoneNumber}`,
            content: {
              templateName,
              language: templateLanguage,
              templateData: {
                body: {
                  placeholders: data,
                },
              },
            },
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: API_KEY,
        },
      },
    );

    console.log('Response: ', response?.data?.messages);
  } catch (error) {
    console.log('Response: ', error?.response?.data);
    return {
      statusCode: 500,
      error: error,
    };
  }
}

module.exports = {
  sendTemplateMessage,
};
