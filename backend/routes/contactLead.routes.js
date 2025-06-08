const express = require('express');
const contactLeadController = require('../controllers/contactLead.controller');

const contactLead = express.Router({ mergeParams: true });

contactLead.post(
  '/',
  contactLeadController.createContactLead,
);


contactLead.get(
  '/',
  contactLeadController.getContactLeads,
);

module.exports = contactLead;
