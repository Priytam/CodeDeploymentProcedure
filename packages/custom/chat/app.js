'use strict';

var Module = require('meanio').Module;
var Chat = new Module('chat');

Chat.register(function(app, auth, database, http) {

    var io = require('../../contrib/socket/server/config/socketio')(http);
    Chat.io = io;

    Chat.routes(io);

    Chat.aggregateAsset('css', 'chat.css');
    return Chat;

});
