var Hapi = require('hapi');
var glob = require('glob');
var path = require('path');
var blipp = require('blipp');
var mongoose = require('mongoose');

var server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 3000,
    host: process.env.HOST || '127.0.0.1'
});

server.register([{
    register: blipp,
    options: {}
}], (err) => {
    if (err) {
        console.log(err);
        return;
    }

    glob
        .sync(path.join(__dirname, 'routes/*.js'))
        .forEach((file) => {
            const route = require(file);
            server.route(route);
        })
})

server.start(function() {
    mongoose.connect('mongodb://localhost:27017/hapi_app');
    var db = mongoose.connection;

    db.once('open', function() {
        console.log('Hapijs and mongoose has been started');
    });
});