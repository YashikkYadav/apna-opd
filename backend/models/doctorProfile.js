const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema(
  {
    doctorId: {
      index: true,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    introduction: {
      required: true,
      type: String,
    },
    happyClients: {
      required: true,
      type: Number,
    },
    experience: {
      required: true,
      type: Number,
    },
    about: {
      required: true,
      type: String,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    locations: [
      {
        name: { type: String },
        address: { type: String },
        days: [{ type: String }],
        from: { type: String },
        to: { type: String },
        timeslot: { type: Number },
      },
    ],
    unavailabilityDate: {
      from: { type: Date },
      to: { type: Date },
    },
    availabilityAfter: { type: Number },
    images: [
      {
        url: { type: String, required: true },
        type: {
          type: String,
          enum: ["galleryImages", "profilePhoto"],
          required: true,
        },
        timestamp: { type: Number, required: true },
        filename: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const DoctorProfile = mongoose.model("DoctorProfile", doctorProfileSchema);
module.exports = DoctorProfile;
