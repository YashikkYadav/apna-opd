const mongoose = require("mongoose");

const RadiologistProfileSchema = new mongoose.Schema(
  {
    healthServeId: {
      index: true,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthServe",
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
    appointmentFee: {
      required: true,
      type: Number,
    },
    about: {
      required: true,
      type: String,
    },
    locations: [
      {
        name: {
          type: String,
        },
        address: {
          type: String,
        },
        days: [
          {
            type: String,
          },
        ],
        from: {
          type: String,
        },
        to: {
          type: String,
        },
        timeslot: {
          type: Number,
        },
      },
    ],
    unavailabilityDate: {
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
    },
    availabilityAfter: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    conditionsTreated: [{ type: String }],
    proceduresOffered: [{ type: String }],
    membershipAwards: [{ type: String }],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    testimonials: [
      {
        rating: { type: Number },
        title: { type: String },
        text: { type: String },
        author: { type: String },
        context: { type: String },
      },
    ],
    languages: [{ type: String }],
    profileImage: { type: String },
    galleryImages: [{ type: String }],
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
  },
  {
    timestamps: true,
  }
);

const RadiologistProfile = mongoose.model(
  "RadiologistProfile",
  RadiologistProfileSchema
);
module.exports = RadiologistProfile;
