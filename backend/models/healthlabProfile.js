const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    id: Number,
    name: String,
    icon: String,
    sampleType: String,
    reportTime: String,
    originalPrice: Number,
    discountedPrice: Number,
    homeCollection: Boolean,
    category: String,
    popular: Boolean
});

const packageSchema = new mongoose.Schema({
    id: Number,
    name: String,
    testsCount: Number,
    tests: [String],
    recommendedFor: String,
    originalPrice: Number,
    discountedPrice: Number,
    reportTime: String,
    homeCollection: Boolean,
    popular: Boolean
});

const reviewSchema = new mongoose.Schema({
    id: Number,
    name: String,
    test: String,
    rating: Number,
    comment: String,
    date: String
});

const faqSchema = new mongoose.Schema({
    question: String,
    answer: String
});

const HealthLabProfileSchema = new mongoose.Schema({
    healthServeId: {
        index: true,
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthServe",
    },
    labInfo: {
        name: String,
        location: String,
        phone: String,
        email: String,
        description: String
    },
    certifications: [String],
    tests: [testSchema],
    packages: [packageSchema],
    reviews: [reviewSchema],
    faqs: [faqSchema],
    healthServeId: String
},
    {
        timestamps: true,
    },
);






const HealthLabProfile = mongoose.model('HealthLabProfile', HealthLabProfileSchema);
module.exports = HealthLabProfile;
