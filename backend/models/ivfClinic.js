const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  rating: Number,
  title: String,
  text: String,
  author: String,
});

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: String,
});

const ivfClinicSchema = new mongoose.Schema(
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
    address: String,
    locality: String,
    city: String,
    pincode: String,
    state: String,
    licensedBy: String,
    successRate: String,
    couplesTreated: String,
    specialization: String,
    website:String,
    whyChoose: [
      {
        title: String,
        description: String,
      }
    ],
    degrees: [
      {
        title: String,
        institution: String,
      }
    ],
    faqs: [
      {
        question: String,
        answer: String,
      }
    ],
    services: [{ type: String }],
    testimonials: [testimonialSchema],
    doctors: [
      {
        name: String,
        specialization: String,
        experience: String,
      }
    ],
    tags: [{ type: String }],
    profilePhoto: { type: String },
    galleryImages: [{ type: String }],
  },
  { timestamps: true }
);

const  ivfClinic= mongoose.model("IvfClinic", ivfClinicSchema);
module.exports=ivfClinic