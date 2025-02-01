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
  '/:user-id',
  patientController.getPatient,
);

patient.delete(
  '/:user-id',
  patientController.deletePatient,
);

module.exports = patient;
