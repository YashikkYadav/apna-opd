const mongoose = require("mongoose");

const healthServeProfileSchema = new mongoose.Schema(
  {
    healthServeId: {
      index: true,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthServe",
    },
    type: {
      index: true,
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    phone: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    location: {
      index: true,
      required: true,
      type: String,
    },
    title: {
      index: true,
      type: String,
      unique: false,
    },
    rating: {
      index: true,
      type: String,
    },
    contactDetails: {
      phone: { type: String },
      address: { type: String },
      organization: { type: String },
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    images: {
      type: [String],
    },
    experience: {
      type: String,
    },
    establishment: {
      type: String,
    },
    certifications: {
      type: String,
    },
    facilities: {
      type: [String],
    },
    schedule: {
      type: [String],
    },
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
