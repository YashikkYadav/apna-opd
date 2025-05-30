const mongoose = require('mongoose');

const HospitalDoctorSchema = new mongoose.Schema(
  {
    healthServeId: {
      index: true,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthServe',
    },
    doctorId: {
      index: true,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
  },
  {
    timestamps: true,
  },
);

const HospitalDoctor = mongoose.model('HospitalDoctor', HospitalDoctorSchema);
module.exports = HospitalDoctor;