const Joi = require("joi");

const createProductValidation = Joi.object({
  product_name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  picture: Joi.string().required(),
  stock: Joi.number().required(),
  category_id: Joi.string().required(),
});

const getProductValidation = Joi.string().required();

const deleteProductValidation = Joi.string().required();

module.exports = {
  createProductValidation,
  getProductValidation,
  deleteProductValidation,
};
