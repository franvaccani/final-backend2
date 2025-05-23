import { CartService } from '../services/cart.service.js';
import { logger } from '../utils/logger.js';

const cartService = new CartService();

export const getCartById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById(cid);
    
    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createCart = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const cart = await cartService.createCart(userId);
    
    res.status(201).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;
    
    const cart = await cartService.addProductToCart(cid, pid, quantity);
    
    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    next(error);
  }
};

export const removeProductFromCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.removeProductFromCart(cid, pid);
    
    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantity = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    
    const cart = await cartService.updateProductQuantity(cid, pid, quantity);
    
    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.clearCart(cid);
    
    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    next(error);
  }
};

export const purchaseCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const userEmail = req.user.email;
    
    const result = await cartService.purchaseCart(cid, userEmail);
    
    res.status(200).json({
      status: 'success',
      data: {
        ticket: result.ticket,
        failedItems: result.failedItems
      }
    });
  } catch (error) {
    next(error);
  }
};