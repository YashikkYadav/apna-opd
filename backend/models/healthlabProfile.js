const mongoose = require('mongoose');
const { Schema } = mongoose;

// Subdocuments
const FAQSchema = new Schema({
  question: { type: String, },
  answer: { type: String, }
});

const PackageSchema = new Schema({
  name: { type: String, },
  details: { type: String, },
  price: { type: String, } // or Number if prices are numeric
});

const TestSchema = new Schema({
  name: { type: String },
  description: { type: String },
  fee: { type: String } // or Number
});

const TestimonialSchema = new Schema({
  rating: { type: Number, min: 1, max: 5, },
  title: { type: String },
  text: { type: String },
  author: { type: String },
  context: { type: String, default: '' }
});

// Main schema
const HealthLabProfileSchema = new Schema({
  healthServeId: {
    index: true,
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "HealthServe",
  },
  about: { type: String },
  experience: { type: String },
  introduction: { type: String },
  website: String,

  keyFeatures: [{ type: String }],
  certifications: [{ type: String }],
  tags: [{ type: String }],

  packages: [PackageSchema],
  faqs: [FAQSchema],
  tests: [TestSchema],
  testimonials: [TestimonialSchema],
  profilePhoto: String,
  galleryImages: [String],
}, {
  timestamps: true,
});

const healthLabProfile = mongoose.model('HealthLabProfile', HealthLabProfileSchema);
module.exports = healthLabProfile
