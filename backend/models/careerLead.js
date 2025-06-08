const mongoose = require("mongoose");

const careerLeadSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    index: true,
    required: true,
    type: String,
  },
  phone: {
    index: true,
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: String,
  },
});

const CareerLead = mongoose.model("CareerLead", careerLeadSchema);
module.exports = CareerLead;
