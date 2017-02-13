const User = require('../models/users');
const Boom = require('boom');
const bcrypt = require('bcryptjs');
const createUserValidate = require('./../schemas/create_user');

var hashPass = function (password, cb) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            return cb(err, hash);
        })
    });
};

module.exports = {
    method: 'POST',
    path: '/users',
    config: {
        description: 'Create a new user',
        handler: function(request, reply) {
            let user = new User();

            user.email = request.payload.email;
            //
            hashPass(request.payload.password, (err, hash) => {
                if (err) {
                    return reply(Boom.badRequest(err))
                }

                user.password = hash;

                user.save((err, user) => {
                    if (err) {
                        return reply(Boom.badRequest(err))
                    }

                    reply(user).code(201);
                });
            });
        },

        validate: {
            payload: createUserValidate
        }
    }
}