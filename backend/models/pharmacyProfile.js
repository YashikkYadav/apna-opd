const mongoose = require('mongoose');
const testimonialSchema = new mongoose.Schema({
  rating: Number,
  title: String,
  text: String,
  author: String,
  context: String
});
const pharmacyProfileSchema = new mongoose.Schema({
  healthServeId: {
    index: true,
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "HealthServe",
  },
  about: { type: String },
  experience: { type: String },
  introduction: { type: String },
  openTime: { type: String },
  closeTime: { type: String },
  servicesOffered: [{ name: String }],
  testimonials: [testimonialSchema],

  medicines: [
    {
      name: String,
      dosage: String,
      stock: String,
      price: String
    }
  ],
  partnerships: [
    {
      name: String,
      description: String,
      link: String
    }
  ],
  features: [
    { title: String }
  ],
  faqs: [
    {
      question: String,
      answer: String
    }
  ],
  tags: [{ type: String }],
  profilePhoto: { type: String },
  galleryImages: [{ type: String }]

},

  {
    timestamps: true,
  },
);

const PharmacyProfile = mongoose.model('PharmacyProfile', pharmacyProfileSchema);
module.exports = PharmacyProfile;

