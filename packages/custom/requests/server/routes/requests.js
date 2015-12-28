'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Requests, app) {

    var requests = require('../controllers/requests')(Requests);

    app.route('/api/request/')
        .get(requests.all)
        .post(requests.create);
    app.route('/api/request/:reqID')
        .get(requests.show)
        .put(requests.update)
        .delete(requests.destroy)
        .post(requests.processData);

    // Finish with setting up the dbId param
    app.param('reqID', requests.article);


    var stepType = require('../controllers/typeDB')();

    app.route('/api/stepType/')
        .get(stepType.getSpecificSteps)
        .post(stepType.getSpecificSteps);
    app.route('/api/stepType/:stepId')
        .get(stepType.show);

    app.param('stepId', stepType.step);

};
