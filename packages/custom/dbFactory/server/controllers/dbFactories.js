'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    DB = mongoose.model('DB'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(DBs) {

    return {
        /**
         * Find article by id
         */
        article: function(req, res, next, id) {
            DB.load(id, function(err, article) {
                if (err) return next(err);
                if (!article) return next(new Error('Failed to load db ' + id));
                req.article = article;
                next();
            });
        },
        /**
         * Create an article
         */
        create: function(req, res) {
            var article = new DB(req.body);
            article.user = req.user;
            article.save(function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: 'Cannot save the db'
                    });
                }
                DBs.events.publish({
                    action: 'created',
                    user: {
                        name: article.host
                    },
                    name: article.host + article.port
                });
                console.log('I am here to get Logged');
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

                DBs.events.publish({
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

                DBs.events.publish({
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

            DBs.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.db.host  + req.db.port,
                url: config.hostname + '/dbFactory/' + req.article._id
            });

            res.json(req.article);
        },
        /**
         * List of Articles
         */
        all: function(req, res) {
            DB.find({}).sort('-created').exec(function(err, articles) {
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