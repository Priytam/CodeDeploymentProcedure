'use strict';

var mongoose = require('mongoose'),
  LocalStrategy = require('passport-local').Strategy,
  config = require('meanio').loadConfig();

module.exports = function(passport)
{
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (id, done) {
        done(null, id);
    });
    passport.use(new LocalStrategy({
                usernameField: 'username',
                passwordField: 'email',
                passReqToCallback: true,
                session: false
            },
            function (req, username, password, done) {
                return done(null, req.body);
            })
    );
  return passport;
};
