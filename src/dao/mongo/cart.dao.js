import { CartModel } from '../models/cart.model.js';
import { logger } from '../../utils/logger.js';

export class MongoCartDao {
  async getAll() {
    try {
      return await CartModel.find().lean();
    } catch (error) {
      logger.error('Error getting all carts:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await CartModel.findById(id).populate('items.product').lean();
    } catch (error) {
      logger.error(`Error getting cart by id ${id}:`, error);
      throw error;
    }
  }

  async getByUserId(userId) {
    try {
      return await CartModel.findOne({ user: userId }).populate('items.product').lean();
    } catch (error) {
      logger.error(`Error getting cart by user id ${userId}:`, error);
      throw error;
    }
  }

  async create(cartData) {
    try {
      const cart = new CartModel(cartData);
      return await cart.save();
    } catch (error) {
      logger.error('Error creating cart:', error);
      throw error;
    }
  }

  async update(id, cartData) {
    try {
      return await CartModel.findByIdAndUpdate(id, cartData, {
        new: true,
        runValidators: true,
      }).lean();
    } catch (error) {
      logger.error(`Error updating cart ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await CartModel.findByIdAndDelete(id).lean();
    } catch (error) {
      logger.error(`Error deleting cart ${id}:`, error);
      throw error;
    }
  }

  async addProduct(cartId, productId, quantity = 1) {
    try {
      const cart = await CartModel.findById(cartId);
      
      if (!cart) {
        throw new Error('Cart not found');
      }
      
      const existingProductIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId.toString()
      );
      
      if (existingProductIndex >= 0) {
        // Product already exists in cart, update quantity
        cart.items[existingProductIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.items.push({
          product: productId,
          quantity,
        });
      }
      
      return await cart.save();
    } catch (error) {
      logger.error(`Error adding product to cart ${cartId}:`, error);
      throw error;
    }
  }

  async removeProduct(cartId, productId) {
    try {
      return await CartModel.findByIdAndUpdate(
        cartId,
        {
          $pull: { items: { product: productId } },
        },
        { new: true }
      ).lean();
    } catch (error) {
      logger.error(`Error removing product from cart ${cartId}:`, error);
      throw error;
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      return await CartModel.findOneAndUpdate(
        { _id: cartId, 'items.product': productId },
        {
          $set: { 'items.$.quantity': quantity },
        },
        { new: true }
      ).lean();
    } catch (error) {
      logger.error(`Error updating product quantity in cart ${cartId}:`, error);
      throw error;
    }
  }

  async clearCart(cartId) {
    try {
      return await CartModel.findByIdAndUpdate(
        cartId,
        { items: [] },
        { new: true }
      ).lean();
    } catch (error) {
      logger.error(`Error clearing cart ${cartId}:`, error);
      throw error;
    }
  }
}