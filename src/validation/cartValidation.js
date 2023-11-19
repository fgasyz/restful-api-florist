const Joi = require("joi");

const createCartValidation = Joi.object({
  product_id: Joi.string().required(),
  total_price: Joi.number().required(),
});

const getCartValidation = Joi.object({
  cartId: Joi.string().required(),
  productId: Joi.string().required(),
});

const deleteCartValidation = Joi.object({
  productId: Joi.string().required(),
  cartId: Joi.string().required(),
});

module.exports = {
  createCartValidation,
  getCartValidation,
  deleteCartValidation,
};
