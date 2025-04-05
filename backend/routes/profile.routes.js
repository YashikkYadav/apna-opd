const express = require('express');
const profileController = require('../controllers/profile.controller');
const doctorProfileController = require('../controllers/doctorProfile.controller');

const profileRoute = express.Router({ mergeParams: true });

profileRoute.post(
  '/',
  profileController.createProfile,
);

profileRoute.get(
  '/',
  doctorProfileController.getDoctorProfile,
);

profileRoute.get(
  '/appointment',
  doctorProfileController.getAppointmentDetails
);

module.exports = profileRoute;