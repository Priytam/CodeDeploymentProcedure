'use strict';

// The Package is past automatically as first parameter
module.exports = function (EPDBs, app) {

  var articles = require('../controllers/epFactories')(EPDBs);

  app.route('/api/epFactory')
      .get(articles.all)
      .post(articles.create);
  app.route('/api/epFactory/:epId')
      .get(articles.show)
      .put(articles.update)
      .delete(articles.destroy);

  // Finish with setting up the dbId param
  app.param('epId', articles.plan);
};
