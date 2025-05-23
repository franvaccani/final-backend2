import { CartRepository } from '../repositories/cart.repository.js';
import { ProductRepository } from '../repositories/product.repository.js';
import { UserRepository } from '../repositories/user.repository.js';
import { TicketRepository } from '../repositories/ticket.repository.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

export class CartService {
  constructor() {
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
    this.userRepository = new UserRepository();
    this.ticketRepository = new TicketRepository();
  }

  async getCartById(id) {
    const cart = await this.cartRepository.getById(id);
    
    if (!cart) {
      throw new NotFoundError(`Cart with id ${id} not found`);
    }
    
    return cart;
  }

  async createCart(userId) {
    // Check if user exists
    const user = await this.userRepository.getById(userId);
    
    if (!user) {
      throw new NotFoundError(`User with id ${userId} not found`);
    }
    
    return await this.cartRepository.create({ user: userId, items: [] });
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    // Check if cart exists
    const cart = await this.cartRepository.getById(cartId);
    
    if (!cart) {
      throw new NotFoundError(`Cart with id ${cartId} not found`);
    }
    
    // Check if product exists
    const product = await this.productRepository.getById(productId);
    
    if (!product) {
      throw new NotFoundError(`Product with id ${productId} not found`);
    }
    
    // Add product to cart
    return await this.cartRepository.addProduct(cartId, productId, quantity);
  }

  async removeProductFromCart(cartId, productId) {
    // Check if cart exists
    const cart = await this.cartRepository.getById(cartId);
    
    if (!cart) {
      throw new NotFoundError(`Cart with id ${cartId} not found`);
    }
    
    // Remove product from cart
    return await this.cartRepository.removeProduct(cartId, productId);
  }

  async updateProductQuantity(cartId, productId, quantity) {
    if (quantity <= 0) {
      throw new BadRequestError('Quantity must be greater than 0');
    }
    
    // Check if cart exists
    const cart = await this.cartRepository.getById(cartId);
    
    if (!cart) {
      throw new NotFoundError(`Cart with id ${cartId} not found`);
    }
    
    // Check if product exists
    const product = await this.productRepository.getById(productId);
    
    if (!product) {
      throw new NotFoundError(`Product with id ${productId} not found`);
    }
    
    // Update product quantity
    return await this.cartRepository.updateProductQuantity(cartId, productId, quantity);
  }

  async clearCart(cartId) {
    // Check if cart exists
    const cart = await this.cartRepository.getById(cartId);
    
    if (!cart) {
      throw new NotFoundError(`Cart with id ${cartId} not found`);
    }
    
    // Clear cart
    return await this.cartRepository.clearCart(cartId);
  }

  async purchaseCart(cartId, userEmail) {
    // Get cart with all product details
    const cart = await this.cartRepository.getRawCartById(cartId);
    
    if (!cart) {
      throw new NotFoundError(`Cart with id ${cartId} not found`);
    }
    
    if (!cart.items || cart.items.length === 0) {
      throw new BadRequestError('Cart is empty');
    }
    
    let totalAmount = 0;
    const purchasedItems = [];
    const failedItems = [];
    
    // Process each item in the cart
    for (const item of cart.items) {
      const productId = item.product._id;
      const requestedQuantity = item.quantity;
      const availableStock = item.product.stock;
      const productPrice = item.product.price;
      
      // Check if product has enough stock
      if (availableStock >= requestedQuantity) {
        // Update product stock
        const newStock = availableStock - requestedQuantity;
        await this.productRepository.updateStock(productId, newStock);
        
        // Add to purchased items
        purchasedItems.push({
          product: productId,
          quantity: requestedQuantity,
          price: productPrice
        });
        
        // Add to total amount
        totalAmount += productPrice * requestedQuantity;
      } else {
        // Add to failed items if not enough stock
        failedItems.push(productId);
      }
    }
    
    // If no products could be purchased
    if (purchasedItems.length === 0) {
      throw new BadRequestError('No products could be purchased due to insufficient stock');
    }
    
    // Create ticket for successful purchase
    const ticketData = {
      amount: totalAmount,
      purchaser: userEmail,
      products: purchasedItems
    };
    
    const ticket = await this.ticketRepository.create(ticketData);
    
    // Update cart to keep only failed items
    if (failedItems.length > 0) {
      const newItems = cart.items.filter(item => 
        failedItems.includes(item.product._id.toString())
      );
      
      await this.cartRepository.update(cartId, { items: newItems });
    } else {
      // Clear cart if all items were purchased
      await this.cartRepository.clearCart(cartId);
    }
    
    return {
      ticket,
      failedItems
    };
  }
}