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
      type: Number,
    },
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
  },
  {
    timestamps: true,
  }
);

const DoctorProfile = mongoose.model("DoctorProfile", doctorProfileSchema);
module.exports = DoctorProfile;
