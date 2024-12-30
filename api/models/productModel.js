import mongoose from "mongoose";

const specSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const discountSchema = new mongoose.Schema({
  percentage: {
    type: Number,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  specs: [specSchema],
  discount: discountSchema,
  rating: {
    value: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
