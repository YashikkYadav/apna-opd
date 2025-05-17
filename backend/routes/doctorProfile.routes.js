const express = require("express");
const doctorProfileController = require("../controllers/doctorProfile.controller");

const doctorProfile = express.Router({ mergeParams: true });

// Existing routes
doctorProfile.delete("/delete-image", doctorProfileController.delelteDoctorImage);
doctorProfile.post("/", doctorProfileController.createDoctorProfile);
doctorProfile.get("/", doctorProfileController.getDoctorProfile);
doctorProfile.get("/get-patients", doctorProfileController.getPatients);
doctorProfile.get("/appointment", doctorProfileController.getAppointmentDetails);

//New route: Submit rating & review count
doctorProfile.post(
  "/review",
  doctorProfileController.submitDoctorReviewController
);

module.exports = doctorProfile;