const Joi = require("joi")

const createUserValidation = Joi.object({
    username : Joi.string().min(10).required(),
    no_hp: Joi.string().max(13).required(),
    password : Joi.string().min(8).required(),
})

const loginUserValidation = Joi.object({
    username: Joi.string().min(10).required(),
    password: Joi.string().min(8).required()
})

const refreshTokenValidation = Joi.string().required()

module.exports = {createUserValidation, loginUserValidation, refreshTokenValidation}