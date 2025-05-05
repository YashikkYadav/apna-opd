const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    type: {
      index: true,
      required: true,
      type: String,
    },
    amount: {
      required: true,
      type: Number,
    },
    subscriptionType: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
