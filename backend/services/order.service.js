const mongoose = require("mongoose");
const Order = require("../models/order.js");
const HealthServe = require("../models/healthServe.js");

// Create a new order
const createOrder = async (healthServeId, data) => {
    try {
        if (!healthServeId) {
            return { statusCode: 400, error: "HealthServeId is required" };
        }

        const healthServe = await HealthServe.findById(healthServeId);
        if (!healthServe) {
            return { statusCode: 404, error: "Health Serve not found" };
        }

        const { items, customerInfo } = data;
        console.log(data);

        if (!items || items.length === 0) {
            return { statusCode: 400, error: "Order items are required" };
        }

        const totalAmount = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        const order = new Order({
            healthServeId,
            orderNumber: `ORD-${Date.now()}`,
            items,
            totalAmount,
            customerInfo,
            status: "pending",
        });

        await order.save();

        return { statusCode: 201, order };
    } catch (error) {
        return { statusCode: 500, error: error.message };
    }
};

// Get all orders for a healthServeId
const getAllOrders = async (healthServeId) => {
    try {
        const orders = await Order.find({ healthServeId }).sort({ createdAt: -1 });
        return { statusCode: 200, orders };
    } catch (error) {
        return { statusCode: 500, error: error.message };
    }
};

// Get single order by ID
const getOrderById = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) return { statusCode: 404, error: "Order not found" };
        return { statusCode: 200, order };
    } catch (error) {
        return { statusCode: 500, error: error.message };
    }
};

// Update order (status / items etc.)
const updateOrder = async (orderId, data) => {
    try {
        const order = await Order.findByIdAndUpdate(orderId, data, { new: true });
        if (!order) return { statusCode: 404, error: "Order not found" };
        return { statusCode: 200, order };
    } catch (error) {
        return { statusCode: 500, error: error.message };
    }
};

// Delete order
const deleteOrder = async (orderId) => {
    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) return { statusCode: 404, error: "Order not found" };
        return { statusCode: 204 };
    } catch (error) {
        return { statusCode: 500, error: error.message };
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
