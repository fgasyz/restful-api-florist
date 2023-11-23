const Joi = require("joi");

const createReportValidation = Joi.object({
  username_admin: Joi.string().required(),
  order_id: Joi.string().required(),
});

const getReportValidation = Joi.string().required();

const deleteReportValidation = Joi.string().required();

module.exports = {
  createReportValidation,
  getReportValidation,
  deleteReportValidation,
};
