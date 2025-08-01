const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  doctorType: { type: String, required: true },
  degree: { type: String, required: true },
  clinicName: { type: String, required: true },
});

module.exports = mongoose.model("ImportExcel", doctorSchema);
