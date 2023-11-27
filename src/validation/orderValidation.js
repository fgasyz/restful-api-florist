const Joi = require("joi");

const createOrderValidation = Joi.object({
  cartId: Joi.array().required(),
});

const getOrderValidation = Joi.string().required();

const deleteOrderValidation = Joi.string().required();

module.exports = {
  createOrderValidation,
  getOrderValidation,
  deleteOrderValidation,
};
