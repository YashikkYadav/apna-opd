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

module.exports = {
  createContactLead,
};
