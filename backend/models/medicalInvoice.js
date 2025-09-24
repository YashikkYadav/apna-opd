const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    medicalId: {
      index: true,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medical",
    },
    invoiceId: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    invoiceType: {
      type: String,
      enum: ["Medical", "Hospital"],
      required: true,
      default: "Medical",
    },

    // Patient Information (common for both)
    patientName: {
      required: true,
      type: String,
    },
    patientPhone: {
      required: true,
      type: String,
    },
    patientAddress: {
      type: String,
    },
    patientAge: {
      type: String,
    },
    patientGender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    // Medical Invoice specific fields
    medicalName: {
      type: String,
    },
    medicines: [
      {
        medicineName: {
          type: String,
        },
        amount: {
          type: String,
          default: 0,
        },
        quantity: {
          type: String,
          default: 0,
        },
        discount: {
          type: String,
          default: 0,
        },
      },
    ],

    // Hospital Invoice specific fields
    hospitalName: {
      type: String,
    },
    hospitalPhone: {
      type: String,
    },
    hospitalAddress: {
      type: String,
    },
    regNo: {
      type: String,
    },
    billNo: {
      type: String,
    },
    doctorName: {
      type: String,
    },
    department: {
      type: String,
    },
    admissionDate: {
      type: Date,
    },
    dischargeDate: {
      type: Date,
    },
    roomType: {
      type: String,
      enum: ["General", "Semi-Private", "Private", "ICU", "CCU"],
    },
    roomString: {
      type: String,
    },
    services: [
      {
        serviceName: {
          type: String,
        },
        serviceDate: {
          type: String,
        },
        amount: {
          type: String,
          default: 0,
        },
        quantity: {
          type: String,
          default: 0,
        },
      },
    ],
    overallDiscount: {
      type: String,
      default: 0,
    },

    // Common fields
    paymentStatus: {
      type: String,
      enum: ["Billed", "Unbilled", "Partially Paid"],
      default: "Unbilled",
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "Credit Card", "UPI", "Online", "Insurance"],
      default: "Cash",
    },
    totalAmount: {
      type: String,
      default: 0,
    },
    grandTotal: {
      type: String,
      default: 0,
    },

    // Legacy fields (for backward compatibility)
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    privateNote: {
      type: String,
    },
    items: [
      {
        service: {
          type: String,
          default: null,
        },
        amount: {
          type: String,
          default: 0,
        },
        quantity: {
          type: String,
          default: 0,
        },
        discount: {
          type: String,
          default: 0,
        },
      },
    ],
    additionalDiscountAmount: {
      type: String,
      default: 0,
    },
    patientNote: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("MedicalInvoice", invoiceSchema);
module.exports = Invoice;
