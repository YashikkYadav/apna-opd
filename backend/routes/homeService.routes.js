const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAllHomeServicesWithProfiles,
} = require("../controllers/homeService.controller");

// GET all home services
router.get("/", getAllHomeServicesWithProfiles);

module.exports = router;
