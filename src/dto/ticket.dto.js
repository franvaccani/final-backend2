export class TicketDTO {
  constructor(ticket) {
    this.id = ticket._id;
    this.code = ticket.code;
    this.purchaseDate = ticket.purchase_datetime;
    this.amount = ticket.amount;
    this.purchaser = ticket.purchaser;
    this.products = ticket.products.map(item => ({
      product: {
        id: item.product._id,
        title: item.product.title
      },
      quantity: item.quantity,
      price: item.price
    }));
  }
}