const express = require('express');
const cartController = require('../controllers/cart.controller');

const router = express.Router();

// Routes without storeId (backward compatibility)
router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.delete('/', cartController.clearCart);

// Item-specific routes
router.put('/:id', cartController.updateQuantity);
router.delete('/:id', cartController.removeFromCart);

module.exports = router;