import { userDao } from '../dao/factory.js';
import { UserDTO } from '../dto/user.dto.js';

export class UserRepository {
  async getAll() {
    const users = await userDao.getAll();
    return users.map(user => new UserDTO(user));
  }

  async getById(id) {
    const user = await userDao.getById(id);
    return user ? new UserDTO(user) : null;
  }

  async getByEmail(email) {
    const user = await userDao.getByEmail(email);
    return user ? new UserDTO(user) : null;
  }

  async getRawByEmail(email) {
    return await userDao.getByEmail(email);
  }

  async create(userData) {
    const createdUser = await userDao.create(userData);
    return new UserDTO(createdUser);
  }

  async update(id, userData) {
    const updatedUser = await userDao.update(id, userData);
    return updatedUser ? new UserDTO(updatedUser) : null;
  }

  async delete(id) {
    const deletedUser = await userDao.delete(id);
    return deletedUser ? new UserDTO(deletedUser) : null;
  }

  async validatePassword(user, password) {
    return await userDao.validatePassword(user, password);
  }
}