const express = require('express');

const patientRoutes = require('./patient.routes');

const router = express.Router();

// Centralizing all the routes in one file
router.use(
  '/patient',
  patientRoutes,
);

module.exports = router;
