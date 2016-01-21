'use strict';

var epPolicy = require('../policies/epPolicy');


module.exports = function (EPDBs, app) {

  var plans = require('../controllers/epFactories');
    epPolicy.setModelName('EPDB');

    app.route('/api/epFactory')
      .all(epPolicy.isAllowed)
      .get(plans.all)
      .post(plans.create);
  app.route('/api/epFactory/:epId')
      .all(epPolicy.isAllowed)
      .get(plans.read)
      .put(plans.update)
      .delete(plans.delete);
  app.param('epId', plans.getByID);
};
