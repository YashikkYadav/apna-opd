const mongoose = require("mongoose");

const PhysiotherapistSchema = new mongoose.Schema(
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
        website: String,
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
            }
        ],
        specialInterests: [{ type: String }],
        certifications: [{ type: String }],
        languages: [{ type: String }],
        conditionsTreated: [{ type: String }],
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

module.exports = mongoose.model("Physiotherapist", PhysiotherapistSchema);
