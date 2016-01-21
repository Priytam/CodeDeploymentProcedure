'use strict';

var dbPolicy = require('../policies/dbPolicy');


module.exports = function (DBs, app) {
    var dbs = require('../controllers/dbFactories');
    dbPolicy.setModelName('DB');

    app.route('/api/dbFactory')
        .all(dbPolicy.isAllowed)
        .get(dbs.all)
        .post(dbs.create);
    app.route('/api/dbFactory/:dbId')
        .all(dbPolicy.isAllowed)
        .get(dbs.read)
        .put(dbs.update)
        .delete(dbs.delete);

    // Finish with setting up the dbId param
    app.param('dbId', dbs.getByID);
};
