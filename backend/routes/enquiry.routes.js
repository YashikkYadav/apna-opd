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
  '/24hours',
  enquiryController.getLast24HoursDataCount,
);

enquiry.get(
  '/30days',
  enquiryController.getLast30DaysDataCount,
);

enquiry.get(
  '/:enquiryId',
  enquiryController.getEnquiryById,
);

enquiry.patch(
  '/:enquiryId',
  enquiryController.updateIsContacted,
);

enquiry.delete(
  '/:enquiryId',
  enquiryController.deleteEnquiry,
);

module.exports = enquiry;
