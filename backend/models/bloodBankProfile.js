const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    rating: Number,
    title: String,
    text: String,
    author: String,
});

const bloodBankSchema = new mongoose.Schema({
    healthServeId: {
        index: true,
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthServe",
    },
    about: String,
    experience: String,
    introduction: String,
    bloodTypes: [{ type: String }], // e.g. ["A+", "O-", ...]
    nearbyBloodBanks: [{ type: String }],
    facilities: [{ type: String }],
    certifications: [{ type: String }],
    establishedYear: String,
    testimonials: [testimonialSchema],
    tags: [{ type: String }],
    license:{type:String},
    profilePhoto: { type: String },
    galleryImages: [{ type: String }]
}, { timestamps: true });

const bloodBank = mongoose.model('BloodBank', bloodBankSchema);
module.exports=bloodBank