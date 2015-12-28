'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Requests = new Module('requests');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Requests.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Requests.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Requests.menus.add({
    title: 'requests example page',
    link: 'requests example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  */
  Requests.aggregateAsset('css', 'requests.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Requests.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Requests.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Requests.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Requests;
});
