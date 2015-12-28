'use strict';
module.exports = function (DBs, app) {

    var articles = require('../controllers/dbFactories')(DBs);

    app.route('/api/dbFactory')
        .get(articles.all)
        .post(articles.create);
    app.route('/api/dbFactory/:dbId')
        .get(articles.show)
        .put(articles.update)
        .delete(articles.destroy);

    // Finish with setting up the dbId param
    app.param('dbId', articles.article);
  };
