const mongoose = require("mongoose");

const HospitlaSchema = new mongoose.Schema(
  {
    healthServeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthServe",
      required: true,
      unique: true,
    },

    // Core profile fields
    about: { type: String },
    experience: { type: String },
    introduction: { type: String },

    // Address details
    address: { type: String },
    locality: { type: String },
    city: { type: String },
    pincode: { type: String },
    state: { type: String },

    // Hospital-specific metadata
    keyStats: [{ type: String }],
    accreditations: [{ type: String }],
    awards: [{ type: String }],
    departments: [{ type: String }],
    facilities: [{ type: String }],
    insurance: [{ type: String }],
    payments: [{ type: String }],
    healthPackages: [{ type: String }],
    specialServices: [{ type: String }],

    // Testimonials
    testimonials: [
      {
        rating: { type: Number },
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

module.exports = mongoose.model("Hospital", HospitlaSchema);
