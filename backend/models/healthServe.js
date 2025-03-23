const mongoose = require('mongoose');

const healthServeSchema = new mongoose.Schema(
  {
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
      required: true,
      type: String,
    },
    location: {
      index: true,
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const HealthServe = mongoose.model('HealthServe', healthServeSchema);
module.exports = HealthServe;
