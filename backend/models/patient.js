const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    phoneNumber: {
      index: true,
      required: true,
      type: Number,
      unique: true,
    },
    email: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    fatherName: {
      required: true,
      type: String,
    },
    address: {
      streetAddress1: {
        required: true,
        type: String,
      },
      streetAddress2: {
        type: String,
      },
      city: {
        required: true,
        type: String,
      },
      state: {
        required: true,
        type: String,
      },
      country: {
        required: true,
        type: String,
      },
      zipCode: {
        required: true,
        type: Number,
      },
    },
    medicalProblem: {
      required: true,
      type: String,
    },
    otp: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
