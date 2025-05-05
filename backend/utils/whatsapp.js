const axios = require('axios');

const {
  ACCESS_TOKEN,
  PHONE_NUMBER_ID,
  WABA_ID,
} = require('../config/config');

const sendTemplateMessage = async (
  phoneNumber,
  templateName,
  templateLanguage,
  data,
) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: `+91${phoneNumber}`,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: templateLanguage,
          },
          components: createTemplateComponent(data),
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ACCESS_TOKEN,
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

const createTemplateComponent = (data) => {
  if (data.length === 0) {
    return [];
  }

  const parameters = [];
  for (let i=0; i<data.length; i++) {
    parameters.push({
      type: 'text',
      text: data[i],
    });
  }

  return [
    {
      type: 'body',
      parameters: parameters,
    },
  ];
}

module.exports = {
  sendTemplateMessage,
};
