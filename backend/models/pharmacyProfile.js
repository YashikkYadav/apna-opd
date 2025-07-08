const mongoose = require('mongoose');

const pharmacyProfileSchema = new mongoose.Schema({
  healthServeId: {
    index: true,
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "HealthServe",
  },
  features: [
    {
      label: String,
      enabled: Boolean
    }
  ],
  medicines: [
    {
      id: Number,
      name: String,
      salt: String,
      manufacturer: String,
      mrp: Number,
      price: Number,
      packSize: String,
      category: String,
      inStock: Boolean,
      discount: Number
    }
  ],
  reviews: [
    {
      name: String,
      rating: Number,
      review: String,
      date: String
    }
  ],
  faqs: [
    {
      q: String,
      a: String
    }
  ],
}, 

   {
        timestamps: true,
    },
);

const PharmacyProfile = mongoose.model('PharmacyProfile', pharmacyProfileSchema);
module.exports = PharmacyProfile;

