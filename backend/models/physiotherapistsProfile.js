const mongoose = require('mongoose');
const testimonialSchema = new mongoose.Schema({
    rating: Number,
    title: String,
    text: String,
    author: String,
    context: String
});
const profileSchema = new mongoose.Schema(
    {
        healthServeId: {
            index: true,
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "HealthServe",
        },
        about: String,
        experience: String,
        introduction: String,
        specialInterests: [{ type: String }],
        education: [{ type: String }],
        therapyPackages: [{ name: String, price: String }],
        testimonials: [testimonialSchema],

        languages: [{ type: String }],
        conditionsTreated: [{ type: String }],
        certifications: [{ type: String }],
        tags: [{ type: String }],
        profilePhoto: { type: String },
        galleryImages: [{ type: String }]
    }
    ,
    {
        timestamps: true,
    },
);

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
