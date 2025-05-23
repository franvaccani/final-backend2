import { productDao } from '../dao/factory.js';
import { ProductDTO } from '../dto/product.dto.js';

export class ProductRepository {
  async getAll(options) {
    const result = await productDao.getAll(options);
    
    const productsDTO = result.docs.map(product => new ProductDTO(product));
    
    return {
      products: productsDTO,
      totalPages: result.totalPages,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
    };
  }

  async getById(id) {
    const product = await productDao.getById(id);
    return product ? new ProductDTO(product) : null;
  }

  async create(productData) {
    const createdProduct = await productDao.create(productData);
    return new ProductDTO(createdProduct);
  }

  async update(id, productData) {
    const updatedProduct = await productDao.update(id, productData);
    return updatedProduct ? new ProductDTO(updatedProduct) : null;
  }

  async delete(id) {
    const deletedProduct = await productDao.delete(id);
    return deletedProduct ? new ProductDTO(deletedProduct) : null;
  }

  async updateStock(id, newStock) {
    const updatedProduct = await productDao.updateStock(id, newStock);
    return updatedProduct ? new ProductDTO(updatedProduct) : null;
  }
}