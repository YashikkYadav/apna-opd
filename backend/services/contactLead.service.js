const ContactLead = require("../models/contactLead");

const createContactLead = async (contactLeadData) => {
  try {
    const { name, email, phone, description } = contactLeadData;

    if (!name || !email || !phone || !description) {
      return {
        statusCode: 400,
        error:
          "Please enter all the required fields (name, email, phone number and description)",
      };
    }

    const newContactLead = new ContactLead({
      name,
      email,
      phone,
      description,
    });
    await newContactLead.save();

    return {
      statusCode: 201,
      contactLead: newContactLead,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

const getContactLeads = async () => {
  try {
    const contactLeads = await ContactLead.find({});

    if (!contactLeads || contactLeads.length === 0) {
      return {
        statusCode: 203,
        error: "No contact leads found",
      };
    }

    return {
      statusCode: 200,
      contactLeads,
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error,
    };
  }
};

module.exports = {
  getContactLeads,
  createContactLead,
};
