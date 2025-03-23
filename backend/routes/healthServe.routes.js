const express = require('express');
const healthServeController = require('../controllers/healthServe.controller');
const healthServe = express.Router({ mergeParams: true });

healthServe.post(
  '/',
  healthServeController.registerHealthServe,
);

healthServe.post(
  '/access-token',
  healthServeController.loginHealthServe,
);

module.exports = healthServe;
