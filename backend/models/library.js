const mongoose = require('mongoose');
const { Schema } = mongoose;

// Sub-schemas
const FAQSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const WhyChooseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const TestimonialSchema = new Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  context: { type: String, default: '' }
});

const DegreeSchema = new Schema({
  title: { type: String, required: true },
  institution: { type: String, required: true }
});

// Main schema
const IVFClinicSchema = new Schema({
  healthServeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'HealthServe' },
  about: { type: String },
  experience: { type: String },
  introduction: { type: String },
  licensedBy: { type: String },
  successRate: { type: String },
  specialization: { type: String },
  couplesTreated: { type: String },
  faqs: [FAQSchema],
  whyChoose: [WhyChooseSchema],
  testimonials: [TestimonialSchema],
  tags: [String],
  degrees: [DegreeSchema],
  services: [String],
  profilePhoto: { type: String },
  galleryImages: [String]
}, {
  timestamps: true,
});

// Export the model
module.exports = mongoose.model('IVFClinic', IVFClinicSchema);

