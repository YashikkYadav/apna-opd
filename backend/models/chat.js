const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  doctorPatientId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoctorPatient",
  },
  senderType: {
    type: String,
    enum: ["doctor", "patient"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
