'use strict';

var Module = require('meanio').Module;

var Features = new Module('features');


Features.register(function(app, auth, database) {

  Features.routes(app, auth, database);


  Features.aggregateAsset('css', 'features.css');


  return Features;
});
