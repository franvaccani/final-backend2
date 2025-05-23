import { Router } from 'express';
import { authenticateJWT, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Note: User routes can be expanded as needed

export default router;