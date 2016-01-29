'use strict';

var config = require('meanio').loadConfig();
var jwt = require('jsonwebtoken');

module.exports = function(MeanUser, app, auth, database, passport) {

    app.route('/api/login')
        .post(passport.authenticate('local', {
            failureFlash: false
        }),
        function (req, res) {
            var admins = config.admins;
            var keys = Object.keys(admins);
            for(var i = 0; i < keys.length; i++){
                if(req.user.username === admins[i].username && req.user.email === admins[i].email){
                    req.user.roles.push('admin');
                }
            }
            res.json({user: req.user});
        });
};
