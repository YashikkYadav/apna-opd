const CareerLead = require("../models/careerLead");
const config = require("../config/config");

const createCareerLead = async (careerLeadData) => {
  try {
    const { name, email, phone, description, resumePath, role } = careerLeadData;

    const resumeUrl = config.BASE_URL + "/" + resumePath;

    if (!name || !email || !phone || !description) {
      return {
        statusCode: 400,
        error:
          "Please enter all the required fields (name, email, phone number and description)",
      };
    }

    const newCareerLead = new CareerLead({
      name,
      email,
      phone,
      role,
      resumeUrl,
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
};

const careerLeads = async () => {
  try {
    const careerLeads = await CareerLead.find({});

    if (!careerLeads || careerLeads.length === 0) {
      return {
        statusCode: 203,
        error: "No career leads found",
      };
    }

    return {
      statusCode: 200,
      careerLeads,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

module.exports = {
  getCareerLeads: careerLeads,
  createCareerLead,
};
