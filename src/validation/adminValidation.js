const Joi = require("joi")

const createAdminValidation = Joi.object({
    username : Joi.string().min(10).required(),
    no_hp: Joi.string().max(13).required(),
    password : Joi.string().min(8).required(),
})

const loginAdminValidation = Joi.object({
    username: Joi.string().min(10).required(),
    password: Joi.string().min(8).required()
})

const refreshTokenValidation = Joi.string().required()

module.exports = {createAdminValidation, loginAdminValidation, refreshTokenValidation}