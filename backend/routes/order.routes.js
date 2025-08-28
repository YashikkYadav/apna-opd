const express = require("express");
const orderController = require("../controllers/order.controller");
const orders = express.Router({ mergeParams: true });

// Create order
orders.post("/", orderController.createOrder);

// Get all orders
orders.get("/", orderController.getAllOrders);

// Get order by ID
orders.get("/:orderId", orderController.getOrderById);

// Update order
orders.patch("/:orderId", orderController.updateOrder);

// Delete order
orders.delete("/:orderId", orderController.deleteOrder);

module.exports = orders;
