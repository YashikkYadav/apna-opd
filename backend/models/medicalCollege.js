const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: String,
    duration: String,
    eligibility: String,
    seats: String,
});

const EligibilityCriteriaSchema = new mongoose.Schema({
    course: String,
    criteria: String,
});

const ImportantDateSchema = new mongoose.Schema({
    label: String,
    value: String,
});

const ScholarshipSchema = new mongoose.Schema({
    name: String,
});

const TestimonialSchema = new mongoose.Schema({
    rating: Number,
    title: String,
    text: String,
    author: String,
    context: String,
});

const MedicalCollegeSchema = new mongoose.Schema(
    {
        healthServeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "HealthServe",
            required: true,
            unique: true,
        },
        about: String,
        experience: String,
        introduction: String,
        address: String,
        locality: String,
        city: String,
        pincode: String,
        state: String,

        website: String,
        established: String,
        affiliatedTo: String,
        approvedBy: String,
        recognition: String,

        courses: [CourseSchema],
        eligibilityCriteria: [EligibilityCriteriaSchema],
        importantDates: [ImportantDateSchema],
        scholarships: [ScholarshipSchema],
        testimonials: [TestimonialSchema],

        whyChoose: [String],
        facilities: [String],
        hospitalTieUps: [String],
        careerServices: [String],
        tags: [String],
        profileImage: { type: String },
        galleryImages: [{ type: String }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("MedicalCollege", MedicalCollegeSchema);
