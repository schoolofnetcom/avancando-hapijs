const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const validateParamsUpdateUser = Joi.object({
    id: Joi.objectId().required()
});

const validatePayloadUpdateUser = Joi.object({
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
});

module.exports = {
    validateParamsUpdateUser: validateParamsUpdateUser,
    validatePayloadUpdateUser: validatePayloadUpdateUser
}