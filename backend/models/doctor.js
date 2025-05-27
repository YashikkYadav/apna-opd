const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      required: true,
      type: String,
    },
    rmcNumber: {
      index: true,
      required: false,
      type: String,
      unique: true,
    },
    phoneNumber: {
      index: true,
      required: true,
      type: String,
    },
    email: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    address: {
      required: true,
      type: String,
    },
    clinicName: {
      type: String,
      default: null,
    },
    speciality: {
      type: String,
      enum: [
        "Cardiologist",
        "Dermatologist",
        "Neurologist",
        "Pediatrician",
        "Orthopedic Surgeon",
        "Gynecologist",
        "Ophthalmologist",
        "Psychiatrist",
        "Endocrinologist",
        "Oncologist",
        "Urologist",
        "Gastroenterologist",
        "Pulmonologist",
        "Rheumatologist",
        "Allergist",
        "Nurse",
        "Ambulance",
      ],
      required: true,
    },
    password: {
      required: true,
      type: String,
    },
    subscriptionType: {
      required: true,
      type: String,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    paymentObject: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
