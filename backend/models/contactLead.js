const mongoose = require("mongoose");

const contactLeadSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    index: true,
    required: true,
    type: String,
  },
  phone: {
    index: true,
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: String,
  },
});

const ContactLead = mongoose.model("ContactLead", contactLeadSchema);
module.exports = ContactLead;
