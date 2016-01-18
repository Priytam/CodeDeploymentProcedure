'use strict';

// The Package is past automatically as first parameter
module.exports = function (EPDBs, app) {

  var plans = require('../controllers/epFactories');

  app.route('/api/epFactory')
      .get(plans.all)
      .post(plans.create);
  app.route('/api/epFactory/:epId')
      .get(plans.read)
      .put(plans.update)
      .delete(plans.delete);
  app.param('epId', plans.getByID);
};
