const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const deleteUserValidate = Joi.object({
    id: Joi.objectId().required()
});

module.exports = deleteUserValidate;