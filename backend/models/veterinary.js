const mongoose = require("mongoose");

const VeterinarySchema = new mongoose.Schema(
    {
        healthServeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HealthServe",
            required: true,
            unique: true,
        },

        // Basic Info
        about: { type: String },
        experience: { type: String }, // keep as String for flexible units like "12 years"
        introduction: { type: String },
        website: { type: String },
        // Address
        address: { type: String },
        locality: { type: String },
        city: { type: String },
        pincode: { type: String },
        state: { type: String },

        // Veterinary-Specific Fields
        specialization: { type: String },
        consultationFee: { type: String }, // can be converted to Number if validation needed
        languages: [{ type: String }],
        availableServices: [{ type: String }],
        facilities: [{ type: String }],
        tags: [{ type: String }],

        // FAQs
        faqs: [
            {
                question: { type: String },
                answer: { type: String },
            },
        ],

        // Testimonials
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

const Veterinary = mongoose.model("Veterinary", VeterinarySchema);
module.exports = Veterinary;