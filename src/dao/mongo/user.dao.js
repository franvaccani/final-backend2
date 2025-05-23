import { UserModel } from '../models/user.model.js';
import { logger } from '../../utils/logger.js';

export class MongoUserDao {
  async getAll() {
    try {
      return await UserModel.find().lean();
    } catch (error) {
      logger.error('Error getting all users:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await UserModel.findById(id).lean();
    } catch (error) {
      logger.error(`Error getting user by id ${id}:`, error);
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      return await UserModel.findOne({ email }).lean();
    } catch (error) {
      logger.error(`Error getting user by email ${email}:`, error);
      throw error;
    }
  }

  async create(userData) {
    try {
      const user = new UserModel(userData);
      return await user.save();
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  }

  async update(id, userData) {
    try {
      return await UserModel.findByIdAndUpdate(id, userData, {
        new: true,
        runValidators: true,
      }).lean();
    } catch (error) {
      logger.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await UserModel.findByIdAndDelete(id).lean();
    } catch (error) {
      logger.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }

  async validatePassword(user, password) {
    try {
      const userDoc = await UserModel.findById(user._id);
      return await userDoc.comparePassword(password);
    } catch (error) {
      logger.error('Error validating password:', error);
      throw error;
    }
  }
}