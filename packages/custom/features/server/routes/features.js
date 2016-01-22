'use strict';

var featuresPolicy = require('../policies/featuresPolicy');

module.exports = function (DBs, app) {
  var features = require('../controllers/features');
  featuresPolicy.setModelName('Feature');

  app.route('/api/features')
      .all(featuresPolicy.isAllowed)
      .get(features.all)
      .post(features.create);
  app.route('/api/features/:featureId')
      .all(featuresPolicy.isAllowed)
      .get(features.read)
      .put(features.update)
      .delete(features.delete);

  // Finish with setting up the dbId param
  app.param('featureId', features.getByID);
};
