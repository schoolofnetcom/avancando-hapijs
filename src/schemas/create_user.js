const Joi = require('joi');

const createUserValidate = Joi.object({
    email: Joi.string().email().min(4).max(50).required(),
    password: Joi.string().required()
});

module.exports = createUserValidate;