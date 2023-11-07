const Joi = require("joi");

const createAdminValidation = Joi.object({
    username : Joi.string().max(20).required(),
    password : Joi.string().max(20).required(),
})

module.exports = {createAdminValidation};