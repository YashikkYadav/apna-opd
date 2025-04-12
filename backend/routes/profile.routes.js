const express = require("express");
const profileController = require("../controllers/profile.controller");
const doctorProfileController = require("../controllers/doctorProfile.controller");

const healthServeProfileRoute = express.Router({ mergeParams: true });

healthServeProfileRoute.post("/", profileController.createProfile);

healthServeProfileRoute.get("/", doctorProfileController.getDoctorProfile);

healthServeProfileRoute.get(
  "/appointment",
  doctorProfileController.getAppointmentDetails
);

module.exports = healthServeProfileRoute;
