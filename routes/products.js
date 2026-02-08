const router = require("express").Router();
const Product = require("../models/product");
const Review = require("../models/review");
const recalc = require("../utils/recalculateRating");

/**
 * GET /api/products
 * Used by ProductsPage
 */
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/**
 * GET /api/products/:id
 * Used by ProductDetailPage
 */
router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ id: Number(req.params.id) });
  if (!product) return res.status(404).json(null);
  res.json(product);
});

/**
 * GET /api/products/:id/reviews
 * Used by ProductDetailPage
 */
router.get("/:id/reviews", async (req, res) => {
  const reviews = await Review.find({
    productId: Number(req.params.id),
  }).sort({ createdAt: -1 });

  res.json(reviews);
});

/**
 * POST /api/products/:id/reviews
 * Used by ReviewClient
 */
router.post("/:id/reviews", async (req, res) => {
  const productId = Number(req.params.id);
  const { user, rating, comment } = req.body;

  if (!user || comment.trim() === "" || rating == null) {
    return res.status(400).json({ error: "Invalid input" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be 1–5" });
  }

  let id = 0

  reviews = await Review.find({productId: productId}).sort({ createdAt: -1 });

  if (reviews.length != 0){
    reviews.forEach((R) => {
      if (R.id > id) {
        id = R.id; 
      }
    }) 
  }
  

  const review = await Review.create({
    id,
    productId,
    user,
    rating: Number(rating),
    comment,
  });

  await recalc(productId);

  res.status(201).json(review);
});


module.exports = router;
