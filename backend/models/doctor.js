const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      required: true,
      type: String,
    },
    rmcNumber: {
      index: true,
      required: false,
      type: String,
      unique: true,
    },
    phoneNumber: {
      index: true,
      required: true,
      type: String,
    },
    email: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    location: {
      required: true,
      type: String,
    },
    pincode: {
      type: String,
    },
    locality: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    address: {
      type: String,
    },
    clinicName: {
      type: String,
      default: null,
    },
    speciality: {
      type: String,
      enum: [
        "Cardiologist",
        "Dermatologist",
        "General Physician",
        "Neurologist",
        "Psychiatrist",
        "Dentist",
        "Gastroenterologist",
        "Nephrologist",
        "Urologist",
        "Pulmonologist",
        "Endocrinologist",
        "Rheumatologist",
        "Oncologist",
        "Hematologist",
        "Immunologist",
        "Infectious Disease Specialist",
        "General Surgeon",
        "Laparoscopic Surgeon",
        "Orthopedic Surgeon",
        "Neurosurgeon",
        "Plastic Surgeon",
        "Cardiothoracic Surgeon",
        "ENT Surgeon",
        "Vascular Surgeon",
        "Bariatric Surgeon",
        "Uro-Surgeon",
        "Colorectal Surgeon",
        "Surgical Oncologist",
        "Gynecologist/Obstetrician",
        "Pediatrician",
        "Neonatologist",
        "Fertility Specialist / IVF",
        "Lactation Consultant",
        "Ophthalmologist",
        "Diabetologist",
        "Geriatrician",
        "Pain Management Specialist",
        "Sleep Medicine Specialist",
        "Psychiatrist",
        "Psychologist",
        "Child Psychologist",
        "Clinical Psychologist",
        "Counsellor",
        "Occupational Therapist",
        "Physiotherapist",
        "Speech Therapist",
        "Audiologist",
        "Acupuncturist",
        "Chiropractor",
        "Prosthetist & Orthotist",
        "Dietitian / Nutritionist",
        "Wellness Coach",
        "Weight Management Specialist",
        "Ayurveda",
        "Homeopathy",
        "Siddha",
        "Unani",
        "Yoga & Naturopathy",
        "Acupressure Specialist",
        "Multi Speciality",
        "Other",
      ],
      required: true,
    },
    password: {
      required: true,
      type: String,
    },
    subscriptionType: {
      type: String,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    paymentObject: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
