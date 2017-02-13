const User = require('./../models/users');
const createUserValidate = require('./../schemas/create_user');
const Suricate = require('hapi-suricate');
const handler = new Suricate(User);
const bcrypt = require('bcryptjs');

var hashPass = function (password, cb) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            return cb(err, hash);
        })
    });
};

module.exports = [{
    method: 'POST',
    path: '/users/suricate',
    config: {
        description: 'Create by suricate plugin',
        handler: function(request, reply) {
            hashPass(request.payload.password, (err, hash) => {
                if (err) {
                    return
                }

                request.payload.password = hash;

                handler.create(request, function(err, doc) {
                    reply(doc).code(201);
                });

            });
        },
        validate: {
            payload: createUserValidate
        }
    }
    }, {
            method: 'GET',
            path: '/users/suricate',
            config: {
                description: 'List all users by suricate',
                handler: handler.find
            }
    }, {
        method: 'GET',
        path: '/users/suricate/{id}',
        config: {
            description: 'List a user by suricate',
            handler: handler.findById
        }
    }, {
        method: ['PUT', 'PATCH'],
        path: '/users/suricate/{id}',
        config: {
            description: 'Update a user by suricate',
            handler: handler.update
        }
    }, {
        method: 'DELETE',
        path: '/users/suricate/{id}',
        config: {
            description: 'Delete a user by suricate',
            handler: handler.remove
        }
    }]