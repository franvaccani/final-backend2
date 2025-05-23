import mongoose from 'mongoose';
import { config } from './config.js';
import { logger } from '../utils/logger.js';

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongodb.uri);
    logger.info('Connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    throw error;
  }
};