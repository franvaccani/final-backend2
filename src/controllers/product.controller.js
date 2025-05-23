import { ProductService } from '../services/product.service.js';
import { logger } from '../utils/logger.js';

const productService = new ProductService();

export const getAllProducts = async (req, res, next) => {
  try {
    const { limit = 10, page = 1, sort, category, availability } = req.query;
    
    // Build query object
    const query = {};
    if (category) query.category = category;
    if (availability) query.status = availability === 'true';
    
    // Build sort object
    const sortOptions = {};
    if (sort) {
      const sortOrder = sort.startsWith('-') ? -1 : 1;
      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      sortOptions[sortField] = sortOrder;
    }
    
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sortOptions,
      query
    };
    
    const result = await productService.getAllProducts(options);
    
    res.status(200).json({
      status: 'success',
      data: result,
      pagination: {
        totalPages: result.totalPages,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    
    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    
    // Set owner to the current user's email if not admin
    if (req.user.role !== 'admin') {
      productData.owner = req.user.email;
    }
    
    const product = await productService.createProduct(productData);
    
    res.status(201).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const product = await productService.updateProduct(id, productData);
    
    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    
    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};