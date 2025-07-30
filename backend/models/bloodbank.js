const mongoose = require('mongoose');

const bloodBankSchema = new mongoose.Schema(
    {
        healthServeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HealthServe',
            required: true,
            index: true,
        },
        about: String,
        experience: String,
        introduction: String,
        address: String,
        locality: String,
        city: String,
        pincode: String,
        state: String,
        establishedYear: String,
        license: String,
        website: String,

        tags: [String],
        facilities: [{ name: String }],
        certifications: [{ name: String }],
        bloodTypes: [
            {
                type: { type: String },
            },
        ],
        nearbyBloodBanks: [{ name: String }],
        testimonials: [
            {
                rating: Number,
                title: String,
                text: String,
                author: String,
            },
        ],
        profileImage: { type: String },
        galleryImages: [{ type: String }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('BloodBank', bloodBankSchema);
