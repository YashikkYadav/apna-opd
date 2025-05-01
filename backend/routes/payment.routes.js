const express = require("express");
const paymentController = require("../controllers/payment.controller");
const payment = express.Router({ mergeParams: true });

payment.post("/", paymentController.createPaymentObject);

module.exports = payment;
