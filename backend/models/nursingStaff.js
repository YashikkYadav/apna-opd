const mongoose = require("mongoose");

const NursingStaffSchema = new mongoose.Schema(
  {
    healthServeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthServe",
      required: true,
      unique: true,
    },

    // Text fields
    about: { type: String },
    experience: { type: String },
    nurseType: { type: String },
    rating: {type: String},
    workingAt: { type: String },
    clients: { type: String },
    perVisitCharges: { type: String },
    areaCovered: { type: String },
    shiftFlexibility: { type: String },
    bookingType: { type: String },
    workingHours: { type: String },

    // Location
    address: { type: String },
    locality: { type: String },
    city: { type: String },
    pincode: { type: String },
    state: { type: String },

    // Arrays
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        year: { type: String },
      },
    ],

    workingDays: [{ type: String }],
    services: [{ type: String }],
    certifications: [{ type: String }],
    languages: [{ type: String }],

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
    profileImage: { type: String },
    galleryImages: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("NursingStaff", NursingStaffSchema);
