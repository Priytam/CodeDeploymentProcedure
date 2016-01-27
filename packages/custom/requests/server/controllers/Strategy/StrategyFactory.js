/**
 * Created by pjpandey on 12/30/2015.
 */
var mongoose = require('mongoose'),
    RequestDB = mongoose.model('Request');
    async = require('async');


    module.exports = function () {

    var strategy = {};
    function registerStrategy(strategyName , strategyLogic){
        strategy[strategyName] = strategyLogic;
    }

    function processData(data, cb) {
        var type, processor, id, reqId;
        id = data.query.stepId;
        reqId = data.params.reqID;
        type = data.query.type;
        if (!type) {
            return cb({
                error :"NonMentionedHandlerTypeError",
                message:"Handler type is not mentioned in request"
            });
        }
        processor = strategy[type];
        if (!processor) {
            return cb({
                error :"UnRegisterHandlerError",
                message:"Handler  " + type + " is  not registered"
            });
        }
        processor.processData(id, reqId,  function(msg){
            afterProcess(id ,reqId, type, function(err) {
                if (err) {
                    return cb(err);
                }
                return cb(null, msg);
            })
        });
    }

    function afterProcess(stepId, reqId, type, cb) {
        async.waterfall([
                function(done) {
                    getStep(stepId, type, function(err, step){
                        var processedStep = step.executionNumber;
                        getRequest(reqId, function(err, result){
                            if(err){
                                done(err);
                            }
                            var request = result;
                            request.processedStep = processedStep;
                            if(step.isFirst){
                                request.status = 'INPROGRESS';
                            }
                            if(step.isLast && step.status === 'FINISHED'){
                                request.status = 'FINISHED';
                            }
                            if(step.status === 'FINISHED'){
                                step.isNext = false;
                            }
                            step.save(function(err) {
                                if(err) {
                                    done(err);
                                }
                                request.save(function(err) {
                                    done(err, step, request);
                                });
                            })
                        })
                    });
                },
                function(previousStep, request, done) {
                    if(!previousStep.isLast && previousStep.status === 'FINISHED') {
                        getNextStep(previousStep, request, function(err , nextStep){
                            if(err) {
                                done(err);
                            }
                            nextStep.isNext = true;
                            nextStep.status = 'WAITING';
                            nextStep.save(function(err, processedStep ){
                                if(err) {
                                    done(err);
                                }
                                done(null, processedStep);
                            })
                        });
                    } else {
                        done(null, 'done');
                    }
                }
            ],
            function(err, msg) {
                if(err){
                    return cb(err);
                }
                return cb(null, msg);
            });
    }


    function getNextStep(previousStep, request, cb) {
        var body = request.steps;
        var keys = Object.keys(body);
        for( var i = 0; i < body.length; i++) {
            var processor, id, type;
            id  = body[i].category;
            type = body[keys[i]].type;
            if (!type) {
                return cb({
                    error :"NonMentionedHandlerTypeError",
                    message:"Handler type is not mentioned in request"
                });
            }
            processor = strategy[type];
            processor.getData(id, function(err, result){
                if (err) {
                    return cb(err);
                }
                if(previousStep.executionNumber + 1 === result.executionNumber){
                    return cb(null, result);
                }
            });
        }
        return cb(null);
    }

    function getRequest(id , cb){
        RequestDB.findOne({_id : id}, function(err, approval) {
            if (err) {
                return cb(err);
            }
            return cb(null, approval);
        });
    }

    function getAllStepsOfARequest(stepList, cb){
        var body = stepList;
        var steps = [];
        var insertedPosition = 0;
        for(var keys = Object.keys(body), i = 0, end = keys.length; i < end; i++) {
            var processor, id, type;
            id  = body[keys[i]].category;
            type = body[keys[i]].type;
            if (!type) {
                return cb({
                    error :"NonMentionedHandlerTypeError",
                    message:"Handler type is not mentioned in request"
                });
            }
            processor = strategy[type];
            processor.getData(id, function(err, result){
                if (err) {
                    return cb({
                        error: 'Cannot process this request'
                    });
                }
                steps[insertedPosition] = result;
                if (++insertedPosition === end) {
                    return cb(null, {steps : steps});
                }
            });
        }
    }

    function insertSteps(stepList, user, email, cb) {
        var typeDb = [];
        var body = stepList;
        var insertedPosition = 0;
        for (var keys = Object.keys(body), i = 0, end = keys.length; i < end; i++) {
            var processor, type;
            type = body[keys[i]].type;
            if (!type) {
                return cb({
                    error: "NonMentionedHandlerTypeError",
                    message: "Handler type is not mentioned in request"
                });
            }
            processor = strategy[type];
            processor.insert(body[keys[i]], keys[i], user, email,  function (err, data) {
                if (err) {
                    return cb({
                        error: 'Cannot process this request'
                    });
                }
                typeDb[insertedPosition] = data;
                if (++insertedPosition == end) {
                    return cb(null, typeDb);
                }
            });
        }
    }

    function getStep(id, type, cb) {
        var processor;
        if (!type) {
            return cb({
                error: "NonMentionedHandlerTypeError",
                message: "Handler type is not mentioned in request"
            });
        }
        processor = strategy[type];
        processor.getData(id, function (err, result) {
            if (err) {
                return cb({
                    error: 'Cannot process this request'
                });
            }
            return cb(null, result);
        })
    }

    function update(id, type, step, cb) {
        var processor;
        if (!type) {
            return cb({
                error: "NonMentionedHandlerTypeError",
                message: "Handler type is not mentioned in request"
            });
        }
        processor = strategy[type];
        processor.update(id, step, function (err, result) {
            if (err) {
                return cb({
                    error: 'Cannot process this request'
                });
            }
            return cb(null, result);
        })
    }

    return {
        registerStrategy : registerStrategy,
        processData : processData,
        getAllStepsOfARequest : getAllStepsOfARequest,
        getStep : getStep,
        update : update,
        insertSteps : insertSteps
    }
};