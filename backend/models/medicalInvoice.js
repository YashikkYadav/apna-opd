const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    medicalId: {
      index: true,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patientId: {
      index: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    invoiceId: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    medicalName: {
      type: String,
      default: null,
    },
    patientName: {
      required: true,
      type: String,
    },
    patientPhone: {
      required: true,
      type: String,
    },
    patientAddress:{
      type: String,
      default: null,
    },
    paymentStatus: {
      type: String,
      default: "Unbilled",
    },
    medicines: [
      {
        medicineName: {
          type: String,
          default: null,
        },
        amount: {
          type: Number,
          default: 0,
        },
        quantity: {
          type: Number,
          default: 0,
        },
        discount: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
    paymentMode: {
      type: String,
      default: "Cash",
    },
  },
  {
    timestamps: true,
  }
);

const MedicalInvoice = mongoose.model('MedicalInvoice', invoiceSchema);
module.exports = MedicalInvoice;
