const express = require("express");
const paymentController = require("../controllers/payment.controller");
const payment = express.Router({ mergeParams: true });

payment.post("/", paymentController.createPaymentObject);
payment.post("/razorpay/webhook", paymentController.webhook);
payment.post("/entity/:entity", paymentController.createPaymentLinkForEntity);
payment.post("/amount/:amount", paymentController.createPaymentLinkForAmount);

module.exports = payment;
