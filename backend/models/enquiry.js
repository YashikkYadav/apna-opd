const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    phone: {
      index: true,
      required: true,
      type: String,
    },
    enquiry: {
      required: true,
      type: String,
    },
    healthServeId: {
      index: true,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthServe',
    }
  },
  {
    timestamps: true,
  },
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);
module.exports = Enquiry;
