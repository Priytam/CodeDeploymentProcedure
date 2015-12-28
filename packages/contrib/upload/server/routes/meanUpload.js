'use strict';

// The Package is past automatically as first parameter
module.exports = function(MeanUpload, app, auth, database) {

    var multipart = require('connect-multiparty'),
        multipartMiddleware = multipart(),
        meanUpload = require('../controllers/meanUpload')(MeanUpload);

    app.post('/api/meanUpload/upload', multipartMiddleware, meanUpload.upload);
};