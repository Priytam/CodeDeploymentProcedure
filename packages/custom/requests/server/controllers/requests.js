'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    RequestDB = mongoose.model('Request'),
    ApprovalDB = mongoose.model('Approval'),
    config = require('meanio').loadConfig(),
    _ = require('lodash'),
    approvalLogic = require('./ApprovalLogic')();

module.exports = function(EPDBs) {

    function createCorrespondingType(req, done) {
        var typeDb = [];
        var body = req.body;
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
            }
        }
    }

    function insertIntoDb(reqData, name, done) {
        var values = [];
        values[0]= reqData.value;
        var data = { values : values, name : name , plan : reqData.name};
        var approval = new ApprovalDB(data);
        approval.user = '';
        approval.save(function(err) {
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
         * Create an article
         */
        create: function(req, res) {
            createCorrespondingType(req, function(err, typeData){
                if (err || ! typeData) {
                    return res.status(500).json({
                        error: 'Cannot save the db'
                    });
                }
                var article = new RequestDB(req.body);
                article.steps = typeData;
                for( var i = 0 ; i < typeData.length ; i++){
                    article.steps[i].type = typeData[i].type;
                    article.steps[i].name = typeData[i].name;
                    article.steps[i].category = typeData[i];
                }
                article.name = typeData[0].plan;
                article.user = req.user;
                article.save(function(err) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot save the db'
                        });
                    }
                    EPDBs.events.publish({
                        user: {
                            name: article.name
                        }
                    });
                    res.json(article);
                });
            });
        },

        /***********************************
         * to Process Specific request
         * @param req
         * @param res
         ********************************/
        processData : function(req, res) {
            var typeId = req.query.stepID;
            ApprovalDB.findOne({
                    _id : typeId
                },
                function(err, approval) {
                    if (err || !approval) {
                        return res.status(500).json({
                            error: 'Cannot process this request'
                        });
                    }
                    switch (approval.type) {
                        case 'Approval':
                            approvalLogic.processApproval(approval, function (result) {
                                changeRequestStateLogic(sendResponse(result));
                            });
                            break;
                    }
                });

            function sendResponse(result){
                res.json(result)
            }

            function changeRequestStateLogic(done) {
                ApprovalDB.find({ _id : req.params.reqID, status : 'FINISHED'}, function(err, data){
                    if(req.request.steps.length  === data.length){
                        req.body.status = 'FINISHED';
                    }
                    else {
                        req.body.status = 'INPROGRESS';
                    }
                    var article = req.request;
                    article = _.extend(article, req.body);
                    article.save(function(err) {
                        if (err) {
                            done(err)
                        }
                        done(null);
                    });
                });
            }

        },
        /**
         * Update an article
         */
        update : function(req, res) {
            var article = req.request;
            article = _.extend(article, req.body);
            article.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the db'
                    });
                }

                EPDBs.events.publish({
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

                EPDBs.events.publish({
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
            EPDBs.events.publish({
                user: {
                    name: req.user
                }
            });
            res.json(req.request);
        },
        /**
         * List of Articles
         */
        all: function(req, res) {
            RequestDB.find({}).sort('-created').exec(function(err, articles) {
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
};