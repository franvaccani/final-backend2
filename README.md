# E-commerce Server Architecture

A professional Node.js e-commerce server implementing DAO, DTO, and Repository patterns with middleware authorization and a complete purchase flow system.

## Features

- **Advanced Architecture Patterns**
  - Data Access Objects (DAO) for database operations
  - Data Transfer Objects (DTO) for secure data transmission
  - Repository pattern for clean business logic
  - Service layer for application logic

- **Authentication**
  - JWT-based authentication
  - Role-based authorization (admin, user)
  - Secure password handling with bcrypt

- **Product Management**
  - CRUD operations for products
  - Product filtering and pagination
  - Admin-only product management

- **Cart System**
  - User-specific carts
  - Add, update, remove products
  - Cart purchase flow with stock validation

- **Purchase Process**
  - Stock verification during checkout
  - Ticket generation for completed purchases
  - Partial purchase support for out-of-stock items

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables (see `.env.example`)
4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/current` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by id
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Carts
- `GET /api/carts/:cid` - Get cart by id
- `POST /api/carts` - Create new cart
- `POST /api/carts/:cid/products/:pid` - Add product to cart
- `DELETE /api/carts/:cid/products/:pid` - Remove product from cart
- `PUT /api/carts/:cid/products/:pid` - Update product quantity in cart
- `DELETE /api/carts/:cid` - Clear cart
- `POST /api/carts/:cid/purchase` - Purchase cart

## Architecture

The project follows a layered architecture:

1. **Routes** - Define API endpoints
2. **Controllers** - Handle request/response
3. **Services** - Implement business logic
4. **Repositories** - Implement data access patterns
5. **DAOs** - Interact with the database
6. **Models** - Define data structure
7. **DTOs** - Secure data transfer
8. **Middlewares** - Process requests
9. **Utils** - Helper functions
10. **Config** - Application configuration

## Database

The application uses MongoDB with Mongoose as the ODM (Object Document Mapper).

## Security

- JWT for authentication
- Bcrypt for password hashing
- Role-based access control
- Data sanitization using DTOs# final-backend2
