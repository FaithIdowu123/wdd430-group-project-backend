const Joi = require("joi");

exports.createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  image: Joi.string().required(),
  seller: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  rating: Joi.number().min(0).max(5),
  materials: Joi.array().items(Joi.string()),
  dimensions: Joi.string().optional(),
  handmade: Joi.boolean(),
  inStock: Joi.boolean(),
});
