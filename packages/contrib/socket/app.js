'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var MeanSocket = new Module('socket');

MeanSocket.register(function(app, auth, database, http) {
    return MeanSocket;
});
