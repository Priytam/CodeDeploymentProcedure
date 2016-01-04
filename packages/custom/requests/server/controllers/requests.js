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
        var body = req.body;
        var insertedPosition = 0;
        for(var keys = Object.keys(body), i = 0, end = keys.length; i < end; i++) {
            console.log('####################');
            console.log(body[keys[i]].type);
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
        var data = {values: values, name: name, plan: reqData.name};
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
            var data = {values: values, name: name, plan: reqData.name};
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
            //entry.registerAll();
            factory.processData(req, function (err, response) {
                if (err) {
                   return res.status(500).json(response);
                }
                res.json(response)
            });
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