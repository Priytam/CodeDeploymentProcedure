'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Requests = new Module('requests');

Requests.register(function(app, auth, database) {

  Requests.routes(app, auth, database);

  Requests.aggregateAsset('css', 'requests.css');

  return Requests;
});
