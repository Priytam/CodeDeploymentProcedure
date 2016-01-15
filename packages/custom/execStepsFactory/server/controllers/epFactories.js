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
        plan : function(req, res, next, id) {
            EPDB.load(id, function(err, plan) {
                if (err)
                    return next(err);
                if (!plan)
                    return next(new Error('Failed to load db ' + id));
                req.plan = plan;
                next();
            });
        },
        /**
         * Create a plan
         */
        create: function(req, res) {
            var plan = new EPDB(req.body);
            plan.user = req.user;
            plan.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the plan'
                    });
                }
                res.json(plan);
            });
        },
        /**
         * Update a plan
         */
        update: function(req, res) {
            var plan = req.plan;
            plan = _.extend(plan, req.body);
            plan.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the plan'
                    });
                }
                res.json(plan);
            });
        },
        /**
         * Delete a plan
         */
        destroy: function(req, res) {
            var plan = req.plan;
            plan.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the plan'
                    });
                }
                res.json(plan);
            });
        },
        /**
         * Show an plan
         */
        show: function(req, res) {
            res.json(req.plan);
        },
        /**
         * List of plans
         */
        all: function(req, res) {
            EPDB.find({}).sort('-created').exec(function(err, plans) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the plans'
                    });
                }
                res.json(plans)
            });

        }
    };
}