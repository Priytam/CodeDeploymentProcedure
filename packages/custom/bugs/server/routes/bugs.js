'use strict';

var bugPolicy = require('../policies/bugPolicy');

module.exports = function (DBs, app) {
  var bugs = require('../controllers/bug');
  bugPolicy.setModelName('Bug');

  app.route('/api/bug')
      .all(bugPolicy.isAllowed)
      .get(bugs.all)
      .post(bugs.create);
  app.route('/api/bug/:bugId')
      .all(bugPolicy.isAllowed)
      .get(bugs.read)
      .put(bugs.update)
      .delete(bugs.delete);

  // Finish with setting up the dbId param
  app.param('bugId', bugs.getByID);
};
