const express = require("express");
const Chat = require("../models/chat");

const message = express.Router({ mergeParams: true });

message.get("/get-messages", async (req, res) => {
  try {
    const { doctorPatientId } = req.params;
    const chat = await Chat.find({ doctorPatientId });
    console.log("Chat = ", chat);
    res.status(200).send(chat);
  } catch (error) {
    console.log("Error while fetching messages from DB : ", error);
    res.status(500).send("Something went worng");
  }
});

module.exports = message;
