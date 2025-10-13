const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
        default: 1,
        min: 1
    },
    userId: {
        type: String,
        default: 'guest'
    },
    storeId: {
        type: String,
        default: 'default-store'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);