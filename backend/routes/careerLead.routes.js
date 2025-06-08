const express = require("express");
const careerLeadController = require("../controllers/careerLead.controller");

const careerLead = express.Router({ mergeParams: true });

careerLead.post("/", careerLeadController.createCareerLead);

careerLead.get("/", careerLeadController.getCareerLeads);

module.exports = careerLead;
