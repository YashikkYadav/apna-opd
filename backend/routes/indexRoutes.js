const express = require('express');

const userRoutes = require('./userRoutes');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Centralizing all the routes in one file
router.use(
  '/user',
  userRoutes,
);

module.exports = router;
