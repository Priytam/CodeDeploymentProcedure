'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    EPDB = mongoose.model('EPDB'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(EPDBs) {

    return {
        /**
         * Find article by id
         */
        article: function(req, res, next, id) {
            EPDB.load(id, function(err, db) {
                if (err)
                    return next(err);
                if (!db)
                    return next(new Error('Failed to load db ' + id));
                req.db = db;
                next();
            });
        },
        /**
         * Create an article
         */
        create: function(req, res) {
            var article = new EPDB(req.body);
            article.user = req.user;
            article.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the db'
                    });
                }
                EPDBs.events.publish({
                    action: 'created',
                    user: {
                        name: article.name
                    },
                    name: article.name
                });
                console.log('I am here');
                res.json(article);
            });
        },
        /**
         * Update an article
         */
        update: function(req, res) {
            var article = req.article;
            article = _.extend(article, req.body);
            article.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the db'
                    });
                }

                EPDBs.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: article.host + article.port,
                    url: config.hostname + '/dbFactory/' + article._id
                });

                res.json(article);
            });
        },
        /**
         * Delete an article
         */
        destroy: function(req, res) {
            var article = req.article;


            article.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the db'
                    });
                }

                EPDBs.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: article.host + article.port
                });

                res.json(article);
            });
        },
        /**
         * Show an article
         */
        show: function(req, res) {

            EPDBs.events.publish({
                action: 'viewed',
                user: {
                    name: req.user
                },
                name: req.db.host  + req.db.port,
                url: config.hostname + '/dbFactory/' + req.db._id
            });

            res.json(req.db);
        },
        /**
         * List of Articles
         */
        all: function(req, res) {
            EPDB.find({}).sort('-created').exec(function(err, articles) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: 'Cannot list the articles'
                    });
                }
                res.json(articles)
            });

        }
    };
}