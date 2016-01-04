/**
 * Created by pjpandey on 12/27/2015.
 */
var mongoose = require('mongoose'),
    config = require('meanio').loadConfig(),
    _ = require('lodash'),
    factory =  require('./StrategyFactory')(),
    entry =  require('./StrategyEntry')(factory).registerAll();

module.exports = function() {

    function getSpecificSteps(req, res) {
        //entry.registerAll();
        var stepList = req.body.steps;
        factory.getAllStepsOfARequest(stepList, function (err, response) {
            if (err) {
                return res.status(500).json(response);
            }
            res.json(response)
        });
    }

    function show(req, res) {
       // entry.registerAll();
        var id = req.params.stepId;
        var type = req.query.type;
        factory.getStep(id, type, function (err, response) {
            if (err) {
                return res.status(500).json(response);
            }
            res.json(response)
        });
    }

    return {
        getSpecificSteps : getSpecificSteps,
        show : show
    };
};