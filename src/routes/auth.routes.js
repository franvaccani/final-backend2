import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Register new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Get current user
router.get('/current', authenticateJWT, authController.getCurrentUser);

export default router;