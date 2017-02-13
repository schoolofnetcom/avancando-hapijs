const User = require('./../models/users');
const deleteUserValidate = require('./../schemas/delete_user');

module.exports = {
    method: 'DELETE',
    path: '/users/{id}',
    config: {
        description: 'Delete a user',
        handler: function(request, reply) {
            User
                .findByIdAndRemove(request.params.id)
                .exec()
                .then(function(data) {
                    reply(data).code(204)
                })
        },
        validate: {
            params: deleteUserValidate
        }
    }
}