const express = require("express");
const doctorProfileController = require("../controllers/doctorProfile.controller");
const doctorProfile = express.Router({ mergeParams: true });

doctorProfile.delete("/delete-image", doctorProfileController.delelteDoctorImage);
doctorProfile.post("/", doctorProfileController.createDoctorProfile);
doctorProfile.get("/", doctorProfileController.getDoctorProfile);
doctorProfile.get("/get-patients", doctorProfileController.getPatients);
doctorProfile.get("/appointment", doctorProfileController.getAppointmentDetails);
doctorProfile.post(
  "/review",
  doctorProfileController.submitDoctorReviewController
);

module.exports = doctorProfile;