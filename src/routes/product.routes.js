import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';
import { authenticateJWT, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Get all products
router.get('/', productController.getAllProducts);

// Get product by id
router.get('/:id', productController.getProductById);

// Create new product (admin only)
router.post('/', authenticateJWT, isAdmin, productController.createProduct);

// Update product (admin only)
router.put('/:id', authenticateJWT, isAdmin, productController.updateProduct);

// Delete product (admin only)
router.delete('/:id', authenticateJWT, isAdmin, productController.deleteProduct);

export default router;