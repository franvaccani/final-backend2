import { ProductModel } from '../models/product.model.js';
import { logger } from '../../utils/logger.js';

export class MongoProductDao {
  async getAll(options = {}) {
    try {
      const { limit = 10, page = 1, sort = {}, query = {} } = options;
      
      const result = await ProductModel.paginate(query, {
        limit,
        page,
        sort,
        lean: true,
      });
      
      return result;
    } catch (error) {
      logger.error('Error getting all products:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await ProductModel.findById(id).lean();
    } catch (error) {
      logger.error(`Error getting product by id ${id}:`, error);
      throw error;
    }
  }

  async create(productData) {
    try {
      const product = new ProductModel(productData);
      return await product.save();
    } catch (error) {
      logger.error('Error creating product:', error);
      throw error;
    }
  }

  async update(id, productData) {
    try {
      return await ProductModel.findByIdAndUpdate(id, productData, {
        new: true,
        runValidators: true,
      }).lean();
    } catch (error) {
      logger.error(`Error updating product ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await ProductModel.findByIdAndDelete(id).lean();
    } catch (error) {
      logger.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  }

  async updateStock(id, newStock) {
    try {
      return await ProductModel.findByIdAndUpdate(
        id,
        { stock: newStock },
        { new: true, runValidators: true }
      ).lean();
    } catch (error) {
      logger.error(`Error updating product stock ${id}:`, error);
      throw error;
    }
  }
}