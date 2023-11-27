const Joi = require("joi");

const createOrderValidation = Joi.array().items(
  Joi.object({
    cart_id: Joi.string().required(),
  })
);

const getOrderValidation = Joi.string().required();

const deleteOrderValidation = Joi.string().required();

module.exports = {
  createOrderValidation,
  getOrderValidation,
  deleteOrderValidation,
};
