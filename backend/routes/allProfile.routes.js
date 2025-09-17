const express = require("express");
const router = express.Router({ mergeParams: true });

const { getAllProfiles } = require("../controllers/allProfiles.controller");

router.get("/", getAllProfiles);

module.exports = router;
