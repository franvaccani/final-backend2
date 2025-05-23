import { config } from '../config/config.js';
import { logger } from '../utils/logger.js';

// DAO imports
import { MongoUserDao } from './mongo/user.dao.js';
import { MongoProductDao } from './mongo/product.dao.js';
import { MongoCartDao } from './mongo/cart.dao.js';
import { MongoTicketDao } from './mongo/ticket.dao.js';

let userDao;
let productDao;
let cartDao;
let ticketDao;

switch (config.persistence) {
  case 'mongo':
    logger.info('Using MongoDB persistence');
    userDao = new MongoUserDao();
    productDao = new MongoProductDao();
    cartDao = new MongoCartDao();
    ticketDao = new MongoTicketDao();
    break;
  
  // Add other persistence methods if needed (e.g., filesystem, memory)
  
  default:
    logger.info('Using default MongoDB persistence');
    userDao = new MongoUserDao();
    productDao = new MongoProductDao();
    cartDao = new MongoCartDao();
    ticketDao = new MongoTicketDao();
    break;
}

export { userDao, productDao, cartDao, ticketDao };