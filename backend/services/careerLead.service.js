const CareerLead = require('../models/careerLead');

const createCareerLead = async ( careerLeadData ) => {
  try {
    const {
      name,
      email,
      phone,
      description,
    } = careerLeadData;

    if (
      !name
      || !email
      || !phone
      || !description
    ) {
      return {
        statusCode: 400,
        error: 'Please enter all the required fields (name, email, phone number and description)',
      };
    }

    const newCareerLead = new CareerLead({
      name,
      email,
      phone,
      description,
    });
    await newCareerLead.save();

    return {
      statusCode: 201,
      careerLead: newCareerLead,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
}

module.exports = {
  createCareerLead,
};
