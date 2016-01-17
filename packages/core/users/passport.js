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
                session: false
            },
            function (username, password, done) {
                return done(null, username);
            })
    );
  return passport;
};
