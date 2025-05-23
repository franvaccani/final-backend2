import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnails: {
      type: [String],
      default: [],
    },
    owner: {
      type: String,
      default: 'admin', // Default owner is admin
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Add pagination plugin
productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model('Product', productSchema);