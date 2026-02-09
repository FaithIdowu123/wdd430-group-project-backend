const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true },
    user: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
  }
);

module.exports = mongoose.model("Review", reviewSchema, "Reviews");
