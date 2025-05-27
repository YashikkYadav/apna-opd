const mongoose = require("mongoose");

const healthServeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      unique: true,
    },
    type: {
      index: true,
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    phone: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: function() {
        return this.type !== 'blood_donor';
      }
    },
    location: {
      index: true,
      required: true,
      type: String,
    },
    subscriptionType: {
      // required: true,
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

const HealthServe = mongoose.model("HealthServe", healthServeSchema);
module.exports = HealthServe;
