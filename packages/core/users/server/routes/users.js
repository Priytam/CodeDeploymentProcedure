'use strict';

var config = require('meanio').loadConfig();
var jwt = require('jsonwebtoken'); //https://npmjs.org/package/node-jsonwebtoken

module.exports = function(MeanUser, app, auth, database, passport) {

    app.route('/api/login')
        .post(passport.authenticate('local', {
            failureFlash: false
        }),
        function (req, res) {
            console.log(req.user);
            console.log('-----------######################---------------------');
            res.json({user: req.user});
        });
};
