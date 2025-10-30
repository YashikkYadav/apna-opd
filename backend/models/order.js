const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    medicineId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const orderSchema = new mongoose.Schema({
    healthServeId: {
        index: true,
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthServe',
    },
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    customerInfo: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    userId: {
        type: String,
        default: 'guest'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);