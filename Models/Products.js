// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  discount_type: String,
  discount_value: Number,
  images: [{ type: String }],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
