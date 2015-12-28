'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var DbFactory = new Module('dbFactory');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
DbFactory.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  DbFactory.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*DbFactory.menus.add({
    title: 'New DataBase Instance',
    link: 'Add DbInstance',
    menu: 'main'
  });*/
  
  DbFactory.aggregateAsset('css', 'dbFactory.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    DbFactory.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    DbFactory.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    DbFactory.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return DbFactory;
});
