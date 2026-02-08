const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },

  name: String,
  price: Number,
  image: String,

  sellerName: String,

  description: String,
  category: String,

  rating: { type: Number, default: 0 },
  materials: [String],
  dimensions: String,

  handmade: Boolean,
  inStock: Boolean,
});

module.exports = mongoose.model("Product", productSchema, "Products");
