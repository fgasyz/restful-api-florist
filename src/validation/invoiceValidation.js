const Joi = require("joi");

const createInvoiceValidation = Joi.array().items(
  Joi.object({
    order_id: Joi.string().required(),
  })
);

module.exports = { createInvoiceValidation };
