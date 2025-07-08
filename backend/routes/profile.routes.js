const express = require("express");
const profileController = require("../controllers/profile.controller");
const doctorProfileController = require("../controllers/doctorProfile.controller");

const healthServeProfileRoute = express.Router({ mergeParams: true });

healthServeProfileRoute.delete("/delete-image", profileController.deleteImage);

healthServeProfileRoute.post("/", profileController.createProfile);

healthServeProfileRoute.get("/", profileController.getHealthServeProfile);

healthServeProfileRoute.get(
  "/appointment",
  doctorProfileController.getAppointmentDetails
);


healthServeProfileRoute.post("/profile-data/",profileController.profileData)
healthServeProfileRoute.get("/profile-data/",profileController.getProfileData)

module.exports = healthServeProfileRoute;
