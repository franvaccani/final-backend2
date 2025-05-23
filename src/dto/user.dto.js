export class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
    this.cart = user.cart;
    this.createdAt = user.createdAt;
    // Excluded: password and other sensitive information
  }
}