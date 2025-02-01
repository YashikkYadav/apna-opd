const express = require('express');

const userRoutes = require('./userRoutes');
const patientRoutes = require('./patient.routes');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Centralizing all the routes in one file
router.use(
  '/user',
  userRoutes,
);

router.use(
  '/patient',
  patientRoutes,
);

module.exports = router;
