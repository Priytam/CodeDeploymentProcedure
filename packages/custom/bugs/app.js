'use strict';

var Module = require('meanio').Module;

var Bugs = new Module('bugs');

Bugs.register(function(app, auth, database) {

  Bugs.routes(app, auth, database);

  Bugs.aggregateAsset('css', 'bugs.css');


  return Bugs;
});
