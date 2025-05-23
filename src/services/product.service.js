import { ProductRepository } from '../repositories/product.repository.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

export class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(options) {
    return await this.productRepository.getAll(options);
  }

  async getProductById(id) {
    const product = await this.productRepository.getById(id);
    
    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    
    return product;
  }

  async createProduct(productData) {
    return await this.productRepository.create(productData);
  }

  async updateProduct(id, productData) {
    const updatedProduct = await this.productRepository.update(id, productData);
    
    if (!updatedProduct) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    
    return updatedProduct;
  }

  async deleteProduct(id) {
    const deletedProduct = await this.productRepository.delete(id);
    
    if (!deletedProduct) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    
    return { message: 'Product deleted successfully' };
  }

  async updateProductStock(id, newStock) {
    if (newStock < 0) {
      throw new BadRequestError('Stock cannot be negative');
    }
    
    const updatedProduct = await this.productRepository.updateStock(id, newStock);
    
    if (!updatedProduct) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    
    return updatedProduct;
  }
}