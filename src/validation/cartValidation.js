const Joi = require("joi");

const createCartValidation = Joi.array().items(
  Joi.object({
    productId: Joi.string().required(),
    qty: Joi.number().min(1).required(),
  })
);

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
