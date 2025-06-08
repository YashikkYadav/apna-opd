const express = require('express');
const doctorController = require('../controllers/doctor.controller');
const doctorMiddleware = require('../middlewares/doctor.middleware');

const doctor = express.Router({ mergeParams: true });

doctor.post(
  '/',
  doctorController.registerDoctor,
);

doctor.post(
  '/access-token',
  doctorController.loginDoctor,
);

doctor.get(
  '/list',
  doctorController.getDoctorList,
)

doctor.get(
  '/:doctorId',
  doctorMiddleware,
  doctorController.getDoctor,
);

doctor.delete(
  '/:doctorId',
  doctorMiddleware,
  doctorController.deleteDoctor,
);

doctor.get(
  '/:doctorId/appointment',
  doctorController.getAppointments,
);

doctor.post(
  '/rating',
  doctorController.ratingDoctor,
);

module.exports = doctor;
