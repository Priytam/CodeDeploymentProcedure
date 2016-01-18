'use strict';
module.exports = function (DBs, app) {
    var dbs = require('../controllers/dbFactories');
    app.route('/api/dbFactory')
        .get(dbs.all)
        .post(dbs.create);
    app.route('/api/dbFactory/:dbId')
        .get(dbs.read)
        .put(dbs.update)
        .delete(dbs.delete);

    // Finish with setting up the dbId param
    app.param('dbId', dbs.getByID);
  };
