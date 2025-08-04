const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema({
    name: String,
    gender: String,
    experience: String,
    certifications: String,
});

const ProgramSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const PlanSchema = new mongoose.Schema({
    name: String,
    price: String,
    features: [String],
});

const RelatedGymSchema = new mongoose.Schema({
    name: String,
    location: String,
    price: String,
});

const TestimonialSchema = new mongoose.Schema({
    rating: Number,
    title: String,
    text: String,
    author: String,
    context: String,
});

const WorldFacilitySchema = new mongoose.Schema({
    name: String,
});

const GymSchema = new mongoose.Schema(
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

        totalMembers: Number,
        established: String,
        operatingHours: String,
        noOfTrainers: String,

        profilePhoto: String,
        galleryImages: [String],

        worldFacilities: [WorldFacilitySchema],
        programs: [ProgramSchema],
        trainers: [TrainerSchema],

        regularOpening: String,
        regularClosing: String,
        sundayOpening: String,
        sundayClosing: String,
        website: String,

        faqs: [
            {
                question: { type: String },
                answer: { type: String },
            },
        ],


        tags: [String],
        plans: [PlanSchema],
        relatedGyms: [RelatedGymSchema],
        testimonials: [TestimonialSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Gym", GymSchema);
