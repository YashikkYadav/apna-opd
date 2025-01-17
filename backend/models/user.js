const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    sop: {
      required: true,
      type: String,
    },
    format: {
      required: true,
      type: String,
    },
    reference: {
      type: String,
      default: 'We',
    },
    conciseness: {
      required: true,
      type: String,
    },
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    numberOfTokensLeft: {
      required: true,
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
