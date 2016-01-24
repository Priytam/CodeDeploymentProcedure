'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    RequestDB = mongoose.model('Request'),
    _ = require('lodash'),
    factory =  require('./Strategy/StrategyFactory')(),
    entry =  require('./Strategy/StrategyEntry')(factory).registerAll(),
    crud = require('../../../../common/BasicCrudController')('Request', '-created');

module.exports = crud;
module.exports.create = create;
module.exports.processData = processData;
module.exports.userProgressRequest = userProgressRequest;

function create (req, res) {
    factory.insertSteps(req.body.steps, req.user.username, req.user.email, function (err, steps) {
        if (err || !steps) {
            return res.status(500).json({
                error: 'Cannot save the request'
            });
        }
        var request = new RequestDB(req.body);
        request.steps = steps;
        for (var i = 0; i < steps.length; i++) {
            request.steps[i].type = steps[i].type;
            request.steps[i].name = steps[i].name;
            request.steps[i].category = steps[i];
        }
        request.user = req.user.username;
        request.email = req.user.email;
        request.save(function (err) {
            if (err) {
                return res.status(500).json({
                    error: 'Cannot save the db'
                });
            }
            res.json(request);
        });
    });
}

/***********************************
* to Process Specific request
* @param req
* @param res
********************************/
function processData(req, res) {
    factory.processData(req, function (err, response) {
        if (err) {
            return res.status(500).json(response);
        }
        return res.json(response)
    });
}

function userProgressRequest(req, res) {
    var query = {};
    if (req.query) {
        query.user = req.query.user;
    }
    query.status = 'INPROGRESS';
    RequestDB.find(query).sort('-created').exec(function(err, requests) {
        if (err) {
            return res.status(500).send({
                message: err
            });
        } else {
            res.json(requests);
        }
    });
}