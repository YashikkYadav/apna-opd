const mongoose = require("mongoose");

const YogaSchema = new mongoose.Schema(
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
    introduction: { type: String },
    totalCustomers: { type: String },
    website: { type: String },
    // Location
    address: { type: String },
    locality: { type: String },
    city: { type: String },
    pincode: { type: String },
    state: { type: String },

    // Arrays
    services: [
      {
        name: { type: String },
        description: { type: String },
      },
    ],
    instructors: [
      {
        name: { type: String },
        designation: { type: String },
        speciality: { type: String },
        description: { type: String },
      },
    ],
    worldClassFacilities: [{ type: String }],
    tags: [{ type: String }],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],

    // Nested objects
    therapyPackages: [
      {
        name: { type: String },
        price: { type: String },
        description: { type: String },
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

module.exports = mongoose.model("yogas", YogaSchema);
