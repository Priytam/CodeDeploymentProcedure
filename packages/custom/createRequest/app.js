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

  //We enable routing. By default the Package Object is passed to the routes
  CreateRequest.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*CreateRequest.menus.add({
    title: 'createRequest',
    link: 'createRequest',
    menu: 'main'
  });*/
  
  CreateRequest.aggregateAsset('css', 'createRequest.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    CreateRequest.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    CreateRequest.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    CreateRequest.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return CreateRequest;
});
