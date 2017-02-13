var Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/',
    config: {
        description: 'Hello world from entry point',
        handler: function(request, reply) {
            // reply('hello world');
            reply(Boom.notFound('THIS IS NO FOUND'))
        }
    }
};