const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema(
  {
    healthServeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthServe",
      required: true,
      index: true,
    },
    introduction: { type: String },
    about: { type: String },

    // Service Location Info
    address: { type: String },
    city: { type: String },
    state: { type: String },
    locality: { type: String },
    pincode: { type: String },
    coverageArea: { type: String }, // e.g., "within city", "intercity"

    // 🚑 Multiple Ambulances
    ambulances: [
      {
        vehicleNumber: { type: String }, // License Plate
        registrationNo: { type: String },
        insuranceNo: { type: String },
        pollutionCertificateNo: { type: String },
        responseTime: { type: Number, default: 30 }, // in minutes

        vehicleType: {
          type: String,
          enum: [
            "Basic Life Support", // BLS
            "Advanced Life Support", // ALS
            "ICU",
            "Neonatal",
            "Mortuary",
          ]
        },

        capacity: { type: Number, default: 1 }, // Patient capacity
        availabilityStatus: {
          type: String,
          enum: ["Available", "On Duty", "Offline"],
          default: "Available",
        },

        // ✅ Medical Equipment
        equipment: {
          type: [
            {
              type: String,
              enum: [
                "Oxygen Cylinder",
                "Ventilator",
                "Cardiac Monitor",
                "First Aid Kit",
                "Suction Machine",
                "Stretcher",
                "Paramedic Available",
              ],
            },
          ],
          default: [],
        },

        // Charges
        charges: {
          perKmRate: { type: String, default: 0 },
          waitingCharge: { type: String, default: 0 },
        },

        // Each ambulance timestamps
        createdAt: { type: Date, default: Date.now },
      },
    ],
    drivers: [
      {
        name: { type: String },
        contactNumbers: [{ type: String }], // multiple contacts possible
        licenseNumber: { type: String },
        experience: { type: String },
      },
    ],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
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

module.exports = mongoose.model("Ambulances", ambulanceSchema);
