const User = require('./../models/users');
const listUserValidate = require('./../schemas/list_user');

module.exports = {
    method: 'GET',
    path: '/users/{id?}',
    config: {
        description: 'List a user by id or all',
        handler: function(request, reply) {
            if (request.params.id) {
                return User
                    .findById(request.params.id)
                    .select('-password -__v')
                    .exec()
                    .then(function(data) {
                        reply(data).code(200)
                    })
            }

            return User
                .find({})
                .select('-password -__v')
                .exec()
                .then(function(data) {
                    reply(data).code(200)
                })
        },
        validate: {
            params: listUserValidate
        }
    }
}