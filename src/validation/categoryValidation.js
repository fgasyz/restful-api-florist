const Joi = require("joi");

const createCategoryValidation = Joi.string().required();
const getCategoryValidation = Joi.string().required();
const deleteCategoryValidation = Joi.string().required();

module.exports = {
  createCategoryValidation,
  getCategoryValidation,
  deleteCategoryValidation,
};
