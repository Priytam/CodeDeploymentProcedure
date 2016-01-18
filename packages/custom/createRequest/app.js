'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var CreateRequest = new Module('createRequest');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
CreateRequest.register(function(app, auth, database) {

  CreateRequest.routes(app, auth, database);

  CreateRequest.aggregateAsset('css', 'createRequest.css');

  return CreateRequest;
});
