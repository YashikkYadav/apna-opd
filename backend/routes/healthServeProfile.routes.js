const express = require("express");
const healthServeProfileController = require("../controllers/healthServeProfile.controller");

const doctorProfile = express.Router({ mergeParams: true });

doctorProfile.post("/", healthServeProfileController.createDoctorProfile);

doctorProfile.get("/", healthServeProfileController.getDoctorProfile);

doctorProfile.get(
  "/appointment",
  healthServeProfileController.getAppointmentDetails
);

module.exports = doctorProfile;
