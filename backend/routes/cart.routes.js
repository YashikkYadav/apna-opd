const express = require('express');
const cartController = require('../controllers/cart.controller');

const router = express.Router();

// Routes without storeId (backward compatibility)


router.delete('/:storeId', cartController.clearCart);

// Item-specific routes
router.put('/:id', cartController.updateQuantity);
router.delete('/:id', cartController.removeFromCart);
router.post("/:storeId", cartController.addToCart);
router.get("/:storeId", cartController.getCart);

module.exports = router;