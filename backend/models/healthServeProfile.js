const mongoose = require("mongoose");

const healthServeProfileSchema = new mongoose.Schema(
  {
    healthServeId: {
      index: true,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthServe",
    },
    about: {
      type: String,
    },
    experience: {
      type: Number,
    },
    introduction: {
      type: String,
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
