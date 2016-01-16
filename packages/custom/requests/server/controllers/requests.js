'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    RequestDB = mongoose.model('Request'),
    ApprovalDB = mongoose.model('Approval'),
    UploadDB = mongoose.model('Upload'),
    config = require('meanio').loadConfig(),
    _ = require('lodash'),
    factory =  require('./StrategyFactory')(),
    entry =  require('./StrategyEntry')(factory).registerAll();


module.exports = function(EPDBs) {

    function createCorrespondingType(req, done) {
        var typeDb = [];
        var body = req.body.steps;
        var insertedPosition = 0;
        for(var keys = Object.keys(body), i = 0, end = keys.length; i < end; i++) {
            switch (body[keys[i]].type) {
                case 'Approval':
                    insertIntoDb(body[keys[i]], keys[i], function (err, data) {
                        if (err) {
                            done(err);
                            return;
                        }
                        typeDb[insertedPosition] = data;
                        if (++insertedPosition == end) {
                            done(null, typeDb);
                        }
                    });
                    break;
                case 'Upload':
                    insertIntoUploadDb(body[keys[i]], keys[i], function (err, data) {
                        if (err) {
                            done(err);
                            return;
                        }
                        typeDb[insertedPosition] = data;
                        if (++insertedPosition == end) {
                            done(null, typeDb);
                        }
                    });
                    break;
            }
        }
    }

    function insertIntoDb(reqData, name, done) {
        var values = [];
        values[0] = reqData.value;
        var data = {values: values, name: name, plan: reqData.name, 'executionNumber': reqData.executionNumber, 'isFirst' : reqData.isFirst , 'isLast' : reqData.isLast };
        var approval = new ApprovalDB(data);
        approval.user = '';
        approval.save(function (err) {
            if (err) {
                done(err, null);
            }
            done(null, approval);
        })
    }


        function insertIntoUploadDb(reqData, name, done) {
            var values = [];
            values[0] = reqData.value;
            var data = {values: values, name: name, plan: reqData.name, 'executionNumber': reqData.executionNumber, 'isFirst' : reqData.isFirst , 'isLast' : reqData.isLast };
            var approval = new UploadDB(data);
            approval.user = '';
            approval.save(function (err) {
                if (err) {
                    done(err, null);
                }
                done(null, approval);
            });
        }

    return {

        /**
         * Find article by id
         */
        article: function(req, res, next, id) {
            RequestDB.load(id, function(err, request) {
                if (err)
                    return next(err);
                if (!request)
                    return next(new Error('Failed to load request ' + id));
                req.request = request;
                next();
            });
        },

        /**
         * Create an request
         */
        create: function(req, res) {
            createCorrespondingType(req, function(err, typeData){
                if (err || ! typeData) {
                    return res.status(500).json({
                        error: 'Cannot save the request'
                    });
                }
                var request = new RequestDB(req.body);
                request.steps = typeData;
                for( var i = 0 ; i < typeData.length ; i++){
                    request.steps[i].type = typeData[i].type;
                    request.steps[i].name = typeData[i].name;
                    request.steps[i].category = typeData[i];
                }
                //request.name = typeData[0].plan;
                request.user = req.user;
                request.save(function(err) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot save the db'
                        });
                    }
                    res.json(request);
                });
            });
        },

        /***********************************
         * to Process Specific request
         * @param req
         * @param res
         ********************************/
        processData : function(req, res) {
            factory.processData(req, function (err, response) {
                if (err) {
                   return res.status(500).json(response);
                }
                return res.json(response)
            });
        },
        /**
         * Update an request
         */
        update : function(req, res) {
            var request = req.request;
            request = _.extend(request, req.body);
            request.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the request'
                    });
                }
                res.json(request);
            });
        },
        /**
         * Delete an request
         */
        destroy: function(req, res) {
            var request = req.request;
            request.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the request'
                    });
                }
                res.json(request);
            });
        },
        /**
         * Show an request
         */
        show: function(req, res) {
            res.json(req.request);
        },
        /**
         * List of Requests
         */
        all: function(req, res) {
            RequestDB.find({}).sort('-created').exec(function(err, requests) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the request'
                    });
                }
                res.json(requests)
            });

        }
    };
};