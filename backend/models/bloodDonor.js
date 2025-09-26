const mongoose = require("mongoose");

const bloodDonorSchema = new mongoose.Schema(
  {
    // 🔹 Personal Information
    healthServeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthServe",
      required: true,
      index: true,
    },
    about: { type: String },

    // Service Location Info
    address: { type: String },
    city: { type: String },
    state: { type: String },
    locality: { type: String },
    pincode: { type: String },

    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dob: { type: String }, // can calculate age dynamically

    // 🔹 Medical & Donation Details
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    lastDonationDate: { type: String },
    numberOfDonations: { type: String, default: 0 },
    eligibilityStatus: {
      type: Boolean,
      default: true, // system can auto-update based on lastDonationDate
    },
    medicalConditions: [{ type: String }], // e.g., ["Diabetes", "Hypertension"]
    weight: { type: String }, // >50kg recommended

    // 🔹 Availability
    willingToDonate: { type: Boolean, default: true },
    preferredDonationLocation: {
      type: String,
      enum: ["Hospital", "Blood Bank", "Anywhere"],
      default: "Anywhere",
    },
    emergencyAvailability: { type: Boolean, default: false },

    // 🔹 Verification
    idProofType: {
      type: String, // store ID number
      enum: ["Aadhaar", "Driving License", "Voter ID", "Passport", "Other"],
    },
    idProofNumber: { type: String }, // store ID number
    verifiedDonor: { type: Boolean, default: true }, // admin verified

    languagesSpoken: [{ type: String }], // e.g., ["English", "Hindi"]
    testimonials: [
      {
        rating: { type: Number},
        title: { type: String },
        text: { type: String },
        author: { type: String },
        context: { type: String },
      },
    ],

    profileImage: { type: String },
    galleryImages: [{ type: String }],

  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodDonors", bloodDonorSchema);
