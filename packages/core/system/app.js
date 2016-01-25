'use strict';

var meanio = require('meanio');
var Module = meanio.Module,
  config = meanio.loadConfig(),
  favicon = require('serve-favicon');

var SystemPackage = new Module('system');

SystemPackage.register(function(app, auth, database, circles) {

    SystemPackage.routes(app, auth, database);
    SystemPackage.aggregateAsset('css', 'common.css');
    SystemPackage.angularDependencies(['ui.router', 'mean-factory-interceptor', 'ngCookies', 'toaster', 'perfect_scrollbar']);

    app.set('views', __dirname + '/server/views');

    if (config.favicon) {
        app.use(favicon(config.favicon));
    } else {
        app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));
    }

    // Adding robots and humans txt
    app.useStatic(__dirname + '/public/assets/static');

    require('../../custom/dbFactory/server/policies/dbPolicy').invokeRolesPolicies();
    require('../../custom/execStepsFactory/server/policies/epPolicy').invokeRolesPolicies();
    require('../../custom/bugs/server/policies/bugPolicy').invokeRolesPolicies();
    require('../../custom/features/server/policies/featuresPolicy').invokeRolesPolicies();


    return SystemPackage;

});
