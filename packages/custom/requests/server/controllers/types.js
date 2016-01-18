/**
 * Created by pjpandey on 12/27/2015.
 */
var mongoose = require('mongoose'),
    config = require('meanio').loadConfig(),
    factory =  require('./Strategy/StrategyFactory')(),
    entry =  require('./Strategy/StrategyEntry')(factory).registerAll();

module.exports = function() {

    function getSpecificSteps(req, res) {
        var stepList = req.body.steps;
        factory.getAllStepsOfARequest(stepList, function (err, response) {
            if (err) {
                return res.status(500).json(response);
            }
            res.json(response)
        });
    }

    function show(req, res) {
        var id = req.params.stepId;
        var type = req.query.type;
        factory.getStep(id, type, function (err, response) {
            if (err) {
                return res.status(500).json(response);
            }
            res.json(response)
        });
    }

    function update(req, res) {
        var id = req.body._id;
        var type = req.body.type;
        var step = req.body;
        factory.update(id, type, step, function (err, response) {
            if (err) {
                return res.status(500).json(err);
            }
            res.json(response)
        });
    }

    return {
        getSpecificSteps : getSpecificSteps,
        show : show,
        update : update
    };
};