const cartService = require('../services/cart.service');
const orderService = require('../services/order.service');

const cartController = {
    async getCart(req, res) {
        try {
            const userId = req.user?.id || 'guest';
            const { storeId } = req.params;
            const cartItems = await cartService.getCartItems(userId);
            res.json(cartItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addToCart(req, res) {
        try {
            const userId = req.user?.id || 'guest';
            const { storeId } = req.params;
            const cartItem = await cartService.addToCart(req.body, userId, storeId);
            res.status(201).json(cartItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateQuantity(req, res) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            
            const updatedItem = await cartService.updateQuantity(id, quantity);
            if (!updatedItem) {
                return res.status(404).json({ error: 'Cart item not found' });
            }
            
            res.json(updatedItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async removeFromCart(req, res) {
        try {
            const { id } = req.params;
            const deletedItem = await cartService.removeFromCart(id);
            
            if (!deletedItem) {
                return res.status(404).json({ error: 'Cart item not found' });
            }
            
            res.json({ message: 'Item removed from cart' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async clearCart(req, res) {
        try {
            const userId = req.user?.id || 'guest';
            const { storeId } = req.params;
            await cartService.clearCart(userId);
            res.json({ message: 'Cart cleared' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

};

module.exports = cartController;