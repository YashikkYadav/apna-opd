const express = require("express");
const healthServeController = require("../controllers/healthServe.controller");
const hospitalController = require("../controllers/hospital.controller");

const hospital = express.Router();

hospital.post("/login", healthServeController.loginHealthServe);

hospital.get("/:hospitalId/doctor", hospitalController.getDoctors);

// hospital.get("/:hospitalId/user", hospitalMiddleware, hospitalController.getUsers);

// hospital.get(
//   "/:hospitalId/user/:userId",
//   hospitalMiddleware,
//   hospitalController.getUserDetails
// );

// hospital.get(
//   "/:hospitalId/:type/healthServe",
//   hospitalMiddleware,
//   hospitalController.getHealthServe
// );

module.exports = hospital;
