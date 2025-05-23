import passport from 'passport';
import { UnauthorizedError, ForbiddenError } from '../utils/errors.js';

// Middleware to authenticate user with JWT
export const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return next(new UnauthorizedError('Invalid or expired token'));
    }
    
    req.user = user;
    next();
  })(req, res, next);
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return next(new UnauthorizedError('Authentication required'));
  }
  
  if (req.user.role !== 'admin') {
    return next(new ForbiddenError('Admin access required'));
  }
  
  next();
};

// Middleware to check if user is the owner of the cart or admin
export const isCartOwnerOrAdmin = (req, res, next) => {
  if (!req.user) {
    return next(new UnauthorizedError('Authentication required'));
  }
  
  const cartId = req.params.cid;
  
  if (req.user.role === 'admin' || req.user.cart.toString() === cartId) {
    return next();
  }
  
  return next(new ForbiddenError('You do not have permission to access this cart'));
};

// Middleware to check if user is the owner of the product or admin
export const isProductOwnerOrAdmin = async (req, res, next) => {
  if (!req.user) {
    return next(new UnauthorizedError('Authentication required'));
  }
  
  if (req.user.role === 'admin') {
    return next();
  }
  
  // This would need to get the product and check the owner
  // For simplicity, we're only allowing admins to modify products
  return next(new ForbiddenError('Only admins can manage products'));
};