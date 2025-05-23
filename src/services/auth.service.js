import { UserRepository } from '../repositories/user.repository.js';
import { CartRepository } from '../repositories/cart.repository.js';
import { generateToken } from '../utils/jwt.js';
import { UnauthorizedError, BadRequestError } from '../utils/errors.js';
import bcrypt from 'bcrypt';

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
    this.cartRepository = new CartRepository();
  }

  async register(userData) {
    // Check if user already exists
    const existingUser = await this.userRepository.getRawByEmail(userData.email);
    
    if (existingUser) {
      throw new BadRequestError('Email already in use');
    }
    
    // Create a new cart for the user
    const cart = await this.cartRepository.create({ items: [] });
    
    // Create user with cart reference
    const newUser = await this.userRepository.create({
      ...userData,
      cart: cart.id,
    });
    
    // Generate JWT token
    const token = generateToken(newUser);
    
    return { user: newUser, token };
  }

  async login(email, password) {
    // Get user with raw data (including password)
    const user = await this.userRepository.getRawByEmail(email);
    
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }
    
    // Convert to DTO for response
    const userDTO = await this.userRepository.getByEmail(email);
    
    // Generate JWT token
    const token = generateToken(user);
    
    return { user: userDTO, token };
  }

  async getCurrentUser(userId) {
    const user = await this.userRepository.getById(userId);
    
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    
    return user;
  }
}