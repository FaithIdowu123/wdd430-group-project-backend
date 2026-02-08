const Product = require("../models/product");
const Review = require("../models/review");

module.exports = async function recalc(productId) {
  const reviews = await Review.find({ productId });

  if (reviews.length === 0) {
    await Product.updateOne({ id: productId }, { rating: 0 });
    return;
  }

  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Product.updateOne(
    { id: productId },
    { rating: Number(avg.toFixed(1)) }
  );
};
