export class CartDTO {
  constructor(cart) {
    this.id = cart._id;
    this.user = cart.user;
    this.items = cart.items.map(item => ({
      product: {
        id: item.product._id,
        title: item.product.title,
        price: item.product.price
      },
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity
    }));
    this.total = this.calculateTotal(cart.items);
  }

  calculateTotal(items) {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }
}