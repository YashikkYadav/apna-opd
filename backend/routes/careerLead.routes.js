const express = require("express");
const careerLeadController = require("../controllers/careerLead.controller");

const careerLead = express.Router({ mergeParams: true });

careerLead.post("/", careerLeadController.createCareerLead);

module.exports = careerLead;
