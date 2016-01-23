'use strict';

// The Package is past automatically as first parameter
module.exports = function(Chat, io) {

    var _ = require('lodash');
    var moment = require('moment');
    var mycontroller = require('../controllers/chats');

    io.on('connection', function(socket) {

        /**
         * disconnect
         */
        socket.on('disconnect', function() {
        });

        /**
         * user:joined
         */
        socket.on('user:joined', function(user) {
            var message = user.name + ' joined the room';
            io.emit('user:joined', {
                message: message,
                time: moment(),
                expires: moment().add(10)
            });
            mycontroller.getAllForSocket( function(data) {
                socket.emit('messages', data);
            });
        });

        /**
         * message:send
         */
        socket.on('message:send', function(message) {
            mycontroller.createFromSocket(message, function(cb) {
                io.emit('message:received', cb);
            });
        });


    });
};
