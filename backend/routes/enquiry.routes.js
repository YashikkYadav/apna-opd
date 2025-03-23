const express = require('express');
const enquiryController = require('../controllers/enquiry.controller');
const enquiry = express.Router({ mergeParams: true });

enquiry.post(
  '/',
  enquiryController.createEnquiry,
);

enquiry.get(
  '/:enquiryId',
  enquiryController.getEnquiryById,
);

enquiry.get(
  '/',
  enquiryController.getAllEnquiries,
);

enquiry.delete(
  '/:enquiryId',
  enquiryController.deleteEnquiry,
);

module.exports = enquiry;
