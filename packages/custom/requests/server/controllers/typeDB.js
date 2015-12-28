/**
 * Created by pjpandey on 12/27/2015.
 */
var mongoose = require('mongoose'),
    RequestDB = mongoose.model('Request'),
    ApprovalDB = mongoose.model('Approval'),
    config = require('meanio').loadConfig(),
    _ = require('lodash'),
    approvalLogic = require('./ApprovalLogic')();

module.exports = function() {

    return {
        getSpecificSteps : function(req, res) {
            var body = req.body.steps;
            var steps = [];
            var insertedPosition = 0;
            for(var keys = Object.keys(body), i = 0, end = keys.length; i < end; i++) {
                    var id  = body[keys[i]].category;
                    switch(body[keys[i]].type) {
                    case 'Approval' :
                        findFromApprovalData(id , function(err, result){
                            if (err) {
                                return res.status(500).json({
                                    error: 'Cannot process this request'
                                });
                            }
                            steps[insertedPosition] = result;
                            if (++insertedPosition == end) {
                                res.json({steps : steps});
                            }
                        });
                        break;
                }
            }
        },
        show: function(req, res) {
            res.json(req.step);
        },

        step : function(req, res, next, id) {
            ApprovalDB.load(id, function(err, step) {
                if (err)
                    return next(err);
                if (!step)
                    return next(new Error('Failed to load request ' + id));
                req.step = step;
                next();
            });
        }
    };


    function findFromApprovalData(id, done){
        ApprovalDB.findOne({
                _id : id
            },
            function(err, approval) {
                if (err || !approval) {
                    done(true)
                }
                done(null, approval)
            });
    }
};