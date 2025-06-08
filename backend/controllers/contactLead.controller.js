const contactLeadService = require('../services/contactLead.service');

const createContactLead = async (req, res) => {
  try {
    const contactLeadData = req.body;

    const contactLead = await contactLeadService.createContactLead(contactLeadData);
    if (contactLead?.error) {
      return res
        .status(contactLead.statusCode)
        .send(contactLead.error);
    }

    res
      .status(contactLead.statusCode)
      .json({
        contactLead: contactLead.contactLead,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

const getContactLeads = async (req, res) => {
  try {

    const contactLeads = await contactLeadService.getContactLeads();
    if (contactLeads?.error) {
      return res
        .status(contactLeads.statusCode)
        .send(contactLeads.error);
    }

    res
      .status(contactLeads.statusCode)
      .json({
        contactLeads: contactLeads.contactLeads,
      });
  } catch(error) {
    res
      .status(500)
      .send(`Error: ${error}`);
  }
}

module.exports = {
  createContactLead,
  getContactLeads
};
