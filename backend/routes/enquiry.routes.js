const express = require('express');
const enquiryController = require('../controllers/enquiry.controller');
const enquiry = express.Router({ mergeParams: true });

enquiry.post(
  '/',
  enquiryController.createEnquiry,
);

enquiry.get(
  '/',
  enquiryController.getAllEnquiries,
);

enquiry.get(
  '/:enquiryId',
  enquiryController.getEnquiryById,
);

enquiry.delete(
  '/:enquiryId',
  enquiryController.deleteEnquiry,
);

module.exports = enquiry;
