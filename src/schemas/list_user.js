const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const listUserValidate = Joi.object({
    id: Joi.objectId().optional()
});

module.exports = listUserValidate;