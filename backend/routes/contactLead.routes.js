const express = require('express');
const contactLeadController = require('../controllers/contactLead.controller');

const contactLead = express.Router({ mergeParams: true });

contactLead.post(
  '/',
  contactLeadController.createContactLead,
);

module.exports = contactLead;
