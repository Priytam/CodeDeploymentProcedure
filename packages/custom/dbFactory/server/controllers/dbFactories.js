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
         * Find db by id
         */
        db: function(req, res, next, id) {
            DB.load(id, function(err, db) {
                if (err) return next(err);
                if (!db) return next(new Error('Failed to load db ' + id));
                req.db = db;
                next();
            });
        },
        /**
         * Create a db
         */
        create: function(req, res) {
            var db = new DB(req.body);
            db.user = req.user;
            db.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the db'
                    });
                }
                res.json(db);
            });
        },
        /**
         * Update a db
         */
        update: function(req, res) {
            var db = req.db;
            db = _.extend(db, req.body);
            db.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the db'
                    });
                }
                 res.json(db);
            });
        },
        /**
         * Delete a db
         */
        destroy: function(req, res) {
            var db = req.db;
            db.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the db'
                    });
                }
                res.json(db);
            });
        },
        /**
         * Show a db
         */
        show: function(req, res) {
            res.json(req.db);
        },
        /**
         * List of dbs
         */
        all: function(req, res) {
            DB.find({}).sort('-created').exec(function(err, db) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the dbs'
                    });
                }
                res.json(db)
            });

        }
    };
};