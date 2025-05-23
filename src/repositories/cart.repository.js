import { cartDao } from '../dao/factory.js';
import { CartDTO } from '../dto/cart.dto.js';

export class CartRepository {
  async getAll() {
    const carts = await cartDao.getAll();
    return carts.map(cart => new CartDTO(cart));
  }

  async getById(id) {
    const cart = await cartDao.getById(id);
    return cart ? new CartDTO(cart) : null;
  }

  async getByUserId(userId) {
    const cart = await cartDao.getByUserId(userId);
    return cart ? new CartDTO(cart) : null;
  }

  async create(cartData) {
    const createdCart = await cartDao.create(cartData);
    return new CartDTO(createdCart);
  }

  async update(id, cartData) {
    const updatedCart = await cartDao.update(id, cartData);
    return updatedCart ? new CartDTO(updatedCart) : null;
  }

  async delete(id) {
    const deletedCart = await cartDao.delete(id);
    return deletedCart ? new CartDTO(deletedCart) : null;
  }

  async addProduct(cartId, productId, quantity) {
    const updatedCart = await cartDao.addProduct(cartId, productId, quantity);
    return new CartDTO(updatedCart);
  }

  async removeProduct(cartId, productId) {
    const updatedCart = await cartDao.removeProduct(cartId, productId);
    return updatedCart ? new CartDTO(updatedCart) : null;
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const updatedCart = await cartDao.updateProductQuantity(cartId, productId, quantity);
    return updatedCart ? new CartDTO(updatedCart) : null;
  }

  async clearCart(cartId) {
    const updatedCart = await cartDao.clearCart(cartId);
    return updatedCart ? new CartDTO(updatedCart) : null;
  }

  // Gets raw cart data for purchase processing
  async getRawCartById(id) {
    return await cartDao.getById(id);
  }
}