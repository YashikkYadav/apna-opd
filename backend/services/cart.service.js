const Cart = require('../models/cart');

const cartService = {
    async getCartItems(userId = 'guest', storeId = null) {
        const query = { userId };
        if (storeId) query.storeId = storeId;
        return await Cart.find(query).sort({ createdAt: -1 });
    },

    async addToCart(medicineData, userId = 'guest', storeId = 'default-store') {
        const existingItem = await Cart.findOne({ 
            medicineId: medicineData.medicineId,
            userId,
            storeId
        });

        if (existingItem) {
            existingItem.quantity += 1;
            return await existingItem.save();
        }

        const cartItem = new Cart({
            medicineId: medicineData.medicineId,
            name: medicineData.name,
            dosage: medicineData.dosage,
            price: medicineData.price,
            quantity: 1,
            userId,
            storeId
        });

        return await cartItem.save();
    },

    async updateQuantity(cartId, quantity) {
        return await Cart.findByIdAndUpdate(
            cartId, 
            { quantity }, 
            { new: true }
        );
    },

    async removeFromCart(cartId) {
        return await Cart.findByIdAndDelete(cartId);
    },

    async clearCart(userId = 'guest') {
        const query = { userId };
        return await Cart.deleteMany(query);
    }
};

module.exports = cartService;