const Joi = require("joi");

const createCartValidation = Joi.string().required();

const getCartValidation = Joi.object({
  cartId: Joi.string().required(),
  productId: Joi.string().required(),
});

const deleteCartValidation = Joi.string().required();

module.exports = {
  createCartValidation,
  getCartValidation,
  deleteCartValidation,
};
