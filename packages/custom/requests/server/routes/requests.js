'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Requests, app) {

    var requests = require('../controllers/requests');

    app.route('/api/request/')
        .get(requests.all)
        .post(requests.create);
    app.route('/api/request/:reqID')
        .get(requests.read)
        .put(requests.update)
        .delete(requests.delete)
        .post(requests.processData);
    app.param('reqID', requests.getByID);

    app.route('/api/user/request/')
        .get(requests.userProgressRequest);

    var stepType = require('../controllers/types')();

    app.route('/api/stepType/')
        .post(stepType.getSpecificSteps);
    app.route('/api/stepType/:stepId')
        .get(stepType.show)
        .put(stepType.update);

    var query = require('../controllers/query')();

    app.route('/api/query/')
        .post(query.query);
    app.route('/api/connection/')
        .post(query.testConnection);
    app.route('/api/query/:queryId')
        .post(query.testConnection);


};
