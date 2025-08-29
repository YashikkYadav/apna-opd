const express = require("express");
const orderController = require("../controllers/order.controller");
const orders = express.Router({ mergeParams: true });

// Specific routes first (before dynamic routes)
orders.get("/24hours", orderController.getLast24HoursDataCount);
orders.get("/30days", orderController.getLast30DaysDataCount);

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
