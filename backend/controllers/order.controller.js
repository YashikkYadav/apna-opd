const orderService = require("../services/order.service");

// Create order
const createOrder = async (req, res) => {
    console.log()
    try {
        const { healthServeId } = req.params;
        const data = req.body;


        const order = await orderService.createOrder(healthServeId, data);
        if (order.error) return res.status(order.statusCode).send(order.error);

        res.status(order.statusCode).json({ order: order.order });
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const { healthServeId } = req.params;

        const orders = await orderService.getAllOrders(healthServeId);
        if (orders.error) return res.status(orders.statusCode).send(orders.error);

        res.status(orders.statusCode).json({ orders: orders.orders });
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

// Get single order
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await orderService.getOrderById(orderId);
        if (order.error) return res.status(order.statusCode).send(order.error);

        res.status(order.statusCode).json({ order: order.order });
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

// Update order
const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const data = req.body;

        const order = await orderService.updateOrder(orderId, data);
        if (order.error) return res.status(order.statusCode).send(order.error);

        res.status(order.statusCode).json({ order: order.order });
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

// Delete order
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await orderService.deleteOrder(orderId);
        if (order.error) return res.status(order.statusCode).send(order.error);

        res.status(204).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

// ✅ Orders in last 24 hours
const getLast24HoursDataCount = async (req, res) => {
    try {
        const { healthServeId } = req.params;

        const order = await orderService.getLast24HoursDataCount(healthServeId);
        if (order?.error) {
            return res.status(order.statusCode).send(order.error);
        }

        res.status(order.statusCode).json({
            order: order.data,
        });
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

// ✅ Orders in last 30 days
const getLast30DaysDataCount = async (req, res) => {
    try {
        const { healthServeId } = req.params;

        const order = await orderService.getLast30DaysDataCount(healthServeId);
        if (order?.error) {
            return res.status(order.statusCode).send(order.error);
        }

        res.status(order.statusCode).json({
            order: order.data,
        });
    } catch (error) {

        res.status(500).send(`Error: ${error}`);
    }
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
