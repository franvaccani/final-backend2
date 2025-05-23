import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Middleware to populate product details when finding carts
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'items.product',
    select: 'title price stock',
  });
  
  next();
});

export const CartModel = mongoose.model('Cart', cartSchema);