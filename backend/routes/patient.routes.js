const express = require('express');
const patientController = require('../controllers/patient.controller');

const patient = express.Router({ mergeParams: true });

patient.post(
  '/',
  patientController.createPatient,
);

patient.post(
  '/generate-otp',
  patientController.generateOTP,
);

patient.post(
  '/access-token',
  patientController.loginPatient,
);

patient.get(
  '/:patientId',
  patientController.getPatient,
);

patient.delete(
  '/:patientId',
  patientController.deletePatient,
);

module.exports = patient;
