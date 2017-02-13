const User = require('./../models/users');
const validateUpdateUser = require('./../schemas/update_user');

module.exports = {
    method: ['PUT', 'PATCH'],
    path: '/users/{id}',
    config: {
        description: 'Update a user',
        handler: function(request, reply) {
            User
                .findByIdAndUpdate(request.params.id, {
                    '$set': request.payload
                })
                .exec()
                .then(function(data) {
                    reply(data).code(200)
                })
        },
        validate: {
            params: validateUpdateUser.validateParamsUpdateUser,
            payload: validateUpdateUser.validatePayloadUpdateUser
        }
    }
}