'use strict';

// The Package is past automatically as first parameter
module.exports = function (EPDBs, app) {

  var plans = require('../controllers/epFactories')(EPDBs);

  app.route('/api/epFactory')
      .get(plans.all)
      .post(plans.create);
  app.route('/api/epFactory/:epId')
      .get(plans.show)
      .put(plans.update)
      .delete(plans.destroy);

  // Finish with setting up the epId param
  app.param('epId', plans.plan);
};
