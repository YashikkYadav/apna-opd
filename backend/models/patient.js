const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    uid: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    fullName: {
      required: true,
      type: String,
    },
    phoneNumber: {
      index: true,
      required: true,
      type: Number,
      // unique: true,
    },
    alternatePhoneNumber: {
      type: Number,
      default: null,
    },
    dateOfBirth: {
      type: Date,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    address: {
      type: String,
    },
    bloodGroup: {
      type: String,
      default: null,
    },
    allergies: {
      type: String,
      default: null,
    },
    tags: {
      type: String,
      default: null,
    },
    referredBy: {
      type: String,
      default: null,
    },
    otp: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
