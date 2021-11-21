const Joi = require('joi')

const registerUserSchema = {
    schema: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
    message: 'Error while creating user'
}

const loginUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
    message: 'Error while user login'
}

module.exports = { registerUserSchema, loginUserSchema }
