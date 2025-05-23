import { Router } from 'express';
import * as cartController from '../controllers/cart.controller.js';
import { authenticateJWT, isCartOwnerOrAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Get cart by id
router.get('/:cid', authenticateJWT, isCartOwnerOrAdmin, cartController.getCartById);

// Create new cart
router.post('/', authenticateJWT, cartController.createCart);

// Add product to cart
router.post('/:cid/products/:pid', authenticateJWT, isCartOwnerOrAdmin, cartController.addProductToCart);

// Remove product from cart
router.delete('/:cid/products/:pid', authenticateJWT, isCartOwnerOrAdmin, cartController.removeProductFromCart);

// Update product quantity in cart
router.put('/:cid/products/:pid', authenticateJWT, isCartOwnerOrAdmin, cartController.updateProductQuantity);

// Clear cart
router.delete('/:cid', authenticateJWT, isCartOwnerOrAdmin, cartController.clearCart);

// Purchase cart
router.post('/:cid/purchase', authenticateJWT, isCartOwnerOrAdmin, cartController.purchaseCart);

export default router;