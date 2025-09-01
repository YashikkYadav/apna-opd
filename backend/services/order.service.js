const mongoose = require("mongoose");
const Order = require("../models/order.js");
const HealthServe = require("../models/healthServe.js");

const moment = require("moment-timezone");
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


// --- Last 24 Hours Orders ---
const getLast24HoursDataCount = async (healthServeId) => {
    try {
        if (!healthServeId) {
            return { statusCode: 400, error: "HealthServeId is required" };
        }

        // Calculate last 24 hours in IST
        const nowIST = moment().tz("Asia/Kolkata");
        const last24HoursIST = nowIST.clone().subtract(24, "hours").toDate();

        let healthServeIdFilter = healthServeId;
        if (typeof healthServeId === "string") {
            healthServeIdFilter = new mongoose.Types.ObjectId(healthServeId);
        }

        const hourlyOrderCounts = await Order.aggregate([
            {
                $match: {
                    healthServeId: healthServeIdFilter,
                    createdAt: { $gte: last24HoursIST },
                },
            },
            {
                $project: {
                    dateHour: {
                        $dateToString: {
                            format: "%Y-%m-%d %H",
                            date: "$createdAt",
                            timezone: "Asia/Kolkata",
                        },
                    },
                },
            },
            {
                $group: {
                    _id: "$dateHour",
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const past24HoursTimestamps = getPast24HourTimestamps();

        const past24HoursOrders = past24HoursTimestamps.map((timestamp) => {
            const match = hourlyOrderCounts.find((item) => item._id === timestamp);
            return match ? match.count : 0;
        });

        return { statusCode: 200, data: past24HoursOrders };
    } catch (error) {
        console.error("Error fetching last 24 hours order count:", error);
        return { statusCode: 500, error: error.message };
    }
};

const getPast24HourTimestamps = () => {
    const past24HoursTimestamps = [];
    for (let i = 0; i < 24; i++) {
        const hourAgo = moment().tz("Asia/Kolkata").subtract(i, "hours");
        past24HoursTimestamps.unshift(hourAgo.format("YYYY-MM-DD HH"));
    }
    return past24HoursTimestamps;
};

// --- Last 30 Days Orders ---
const getLast30DaysDataCount = async (healthServeId) => {
    try {
        if (!healthServeId) {
            return { statusCode: 400, error: "HealthServeId is required" };
        }

        const now = new Date();
        const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        let healthServeIdFilter = healthServeId;
        if (typeof healthServeId === "string") {
            healthServeIdFilter = new mongoose.Types.ObjectId(healthServeId);
        }

        const dailyOrderCount = await Order.aggregate([
            {
                $match: {
                    healthServeId: healthServeIdFilter,
                    createdAt: { $gte: last30Days },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const last30DayDates = getLastMonthTimestamps();

        const last30DayOrders = last30DayDates.map((date) => {
            const match = dailyOrderCount.find((item) => item._id === date);
            return match ? match.count : 0;
        });

        return { statusCode: 200, data: last30DayOrders };
    } catch (error) {
        console.error("Error fetching last 30 days order count:", error);
        return { statusCode: 500, error: error.message };
    }
};

const getLastMonthTimestamps = () => {
    const last30DaysTimestamps = [];
    const now = new Date();

    for (let i = 0; i < 30; i++) {
        const dayAgo = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - i
        );

        const year = dayAgo.getFullYear();
        const month = (dayAgo.getMonth() + 1).toString().padStart(2, "0");
        const day = dayAgo.getDate().toString().padStart(2, "0");

        last30DaysTimestamps.unshift(`${year}-${month}-${day}`);
    }

    return last30DaysTimestamps;
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getLast24HoursDataCount,
    getLast30DaysDataCount
};
