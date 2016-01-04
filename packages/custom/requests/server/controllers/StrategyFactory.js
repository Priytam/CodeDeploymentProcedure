/**
 * Created by pjpandey on 12/30/2015.
 */
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
            return cb(null, msg);
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

    return {
        registerStrategy : registerStrategy,
        processData : processData,
        getAllStepsOfARequest : getAllStepsOfARequest,
        getStep : getStep
    }
};