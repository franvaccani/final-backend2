import { TicketModel } from '../models/ticket.model.js';
import { logger } from '../../utils/logger.js';

export class MongoTicketDao {
  async getAll() {
    try {
      return await TicketModel.find().populate('products.product').lean();
    } catch (error) {
      logger.error('Error getting all tickets:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await TicketModel.findById(id).populate('products.product').lean();
    } catch (error) {
      logger.error(`Error getting ticket by id ${id}:`, error);
      throw error;
    }
  }

  async getByCode(code) {
    try {
      return await TicketModel.findOne({ code }).populate('products.product').lean();
    } catch (error) {
      logger.error(`Error getting ticket by code ${code}:`, error);
      throw error;
    }
  }

  async getByPurchaser(email) {
    try {
      return await TicketModel.find({ purchaser: email }).populate('products.product').lean();
    } catch (error) {
      logger.error(`Error getting tickets by purchaser ${email}:`, error);
      throw error;
    }
  }

  async create(ticketData) {
    try {
      const ticket = new TicketModel(ticketData);
      return await ticket.save();
    } catch (error) {
      logger.error('Error creating ticket:', error);
      throw error;
    }
  }

  async update(id, ticketData) {
    try {
      return await TicketModel.findByIdAndUpdate(id, ticketData, {
        new: true,
        runValidators: true,
      }).lean();
    } catch (error) {
      logger.error(`Error updating ticket ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await TicketModel.findByIdAndDelete(id).lean();
    } catch (error) {
      logger.error(`Error deleting ticket ${id}:`, error);
      throw error;
    }
  }
}