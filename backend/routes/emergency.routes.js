const express = require("express");
const router = express.Router({ mergeParams: true });

const { getEmergencyProfiles } = require("../controllers/emergency.controller");

router.get("/", getEmergencyProfiles);

module.exports = router;
