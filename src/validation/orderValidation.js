const Joi = require("joi");

const createOrderValidation = Joi.object({
  proof: Joi.string().required(),
  username_user: Joi.string().required(),
  cart_Id: Joi.string().required(),
});

const getOrderValidation = Joi.string().required();

const deleteOrderValidation = Joi.string().required();

module.exports = {
  createOrderValidation,
  getOrderValidation,
  deleteOrderValidation,
};
