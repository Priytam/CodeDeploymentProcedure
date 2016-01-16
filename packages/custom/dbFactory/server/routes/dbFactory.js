'use strict';
module.exports = function (DBs, app) {

    var dbs = require('../controllers/dbFactories')(DBs);

    app.route('/api/dbFactory')
        .get(dbs.all)
        .post(dbs.create);
    app.route('/api/dbFactory/:dbId')
        .get(dbs.show)
        .put(dbs.update)
        .delete(dbs.destroy);

    // Finish with setting up the dbId param
    app.param('dbId', dbs.db);
  };
