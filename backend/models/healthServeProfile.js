const mongoose = require("mongoose");

const healthServeProfileSchema = new mongoose.Schema(
  {
    healthServeId: {
      index: true,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthServe",
    },
    about: String,
    phone: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    experience: Number,
    introduction: String,
    rating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["galleryImages", "profilePhoto"],
          required: true,
        },
        timestamp: {
          type: Number,
          required: true,
        },
        filename: {
          type: String,
          required: true,
        },
      },
    ],
    keyStats: [String],
    accreditations: [String],
    awards: [String],
    departments: [String],
    facilities: [String],
    insurance: [String],
    payments: [String],
    healthPackages: [String],
    specialServices: [String],
    testimonials: [
      {
        rating: Number,
        title: String,
        text: String,
        author: String,
        context: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const HealthServeProfile = mongoose.model(
  "HealthServeProfile",
  healthServeProfileSchema
);

module.exports = HealthServeProfile;
