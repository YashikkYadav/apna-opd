const mongoose = require('mongoose');
const { Schema } = mongoose;

// Subdocuments
const TherapyPackageSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String } // change to Number if numeric
});

const TestimonialSchema = new Schema({
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String },
    text: { type: String },
    author: { type: String },
    context: { type: String, default: '' }
});

// Main Schema
const PhysiotherapistProfileSchema = new Schema({
    healthServeId: {
        index: true,
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthServe",
    },
    about: { type: String },
    experience: { type: String },
    introduction: { type: String },

    education: [{ degree: String,institution: String,year: String }], // nulls will be ignored
    specialInterests: [{ type: String }],
    certifications: [{ type: String }],
    languages: [{ type: String }],
    conditionsTreated: [{ type: String }],
    tags: [{ type: String }],

    therapyPackages: [TherapyPackageSchema],
    testimonials: [TestimonialSchema]
}, {
    timestamps: true,
});

const physiotherapistProfile = mongoose.model('PhysiotherapistProfile', PhysiotherapistProfileSchema);
module.exports =physiotherapistProfile
