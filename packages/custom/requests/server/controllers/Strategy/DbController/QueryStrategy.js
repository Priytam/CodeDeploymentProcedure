/**
 * Created by pjpandey on 12/30/2015.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    nodemailer = require('nodemailer'),
    config = require('meanio').loadConfig(),
    async = require('async'),
    templates = require('./../../template'),
    QueryDB = mongoose.model('Query');

module.exports =  function () {

    var serviceList = {};
    function registerService(serviceName , service){
        serviceList[serviceName] = service;
    }

    function getData(id , cb){
        QueryDB.findOne({_id : id}, function(err, approval) {
            if (err) {
                return cb(err);
            }
            return cb(null, approval);
        });
    }

    function sendMail(mailOptions, done) {
        var transport = nodemailer.createTransport(config.mailer);
        transport.sendMail(mailOptions, function(err, response) {
            if (err)
                return done(err);
            return done(null,response);
        });
    }

    function processStep(id, reqId, cb) {
        getData(id, function(err , query) {
            async.waterfall([
                    function (done) {
                        if (!query) {
                            return done(true);
                        }
                        else if (query.status !== 'INPROGRESS') {
                            return done(true);
                        }
                        return done(null);
                    },
                    function (done) {
                        var mailOptions = {
                            to: query.user,
                            from: 'CDP'
                        };
                        mailOptions = templates.approval_email(query.user, reqId, query._id, query.plan, mailOptions);
                        sendMail(mailOptions, function (err, result) {
                            if (err) {
                                return done(err);
                            }
                        });
                        done(null);
                    }
                ],
                function (err) {
                    var response = {
                        message: 'Query upload success mail sent successfully',
                        status: 'success'
                    };
                    if (err) {
                        response.message = 'Query step failed' + err;
                        response.status = 'danger';
                    }
                    query.status = 'FINISHED';
                    query.state = 'QuerySavedAndFinished';
                    query.currentStateNumber = 3;
                    query.save(function (err) {
                        if (err) {
                            response.message = 'Query step failed' + err;
                            response.status = 'danger';
                        }
                        return cb(null, response);
                    });
                });
        })
    }

    function query(connectionString, queryString, cb) {
        var service = serviceList[connectionString.serviceType];
        service.query(connectionString, queryString, function(err, response){
            if(err)
                return cb(err);
            return cb(null, response)
        })
    }

    function testConnection(req, cb) {
        var service = serviceList[req.serviceType];
        service.testConnection(req, function(err, response){
            if(err)
                return cb(err);
            return cb(null, response);
        })
    }

    function insert(reqData, name, user, email, done) {
        var data = {
            queryString : reqData.values[0],
            connectionString : reqData.connectionString,
            name : name,
            plan : reqData.name,
            executionNumber : reqData.executionNumber,
            isFirst : reqData.isFirst,
            isLast : reqData.isLast
        };
        var approval = new QueryDB(data);
        approval.user = user;
        approval.email = email;
        approval.save(function (err) {
            if (err) {
                done(err, null);
            }
            done(null, approval);
        })
    }

    function update(id, step, cb) {
        getData(id, function(err, result){
            if(err){
                return cb(err);
            }
            var queryData = result;
            queryData = _.extend(queryData,step);
            queryData.save(function(err) {
                if (err) {
                    return cb(err);
                }
                cb(null, queryData);
            });
        });
    }

    return {
        registerService : registerService,
        processData :  processStep,
        query : query,
        update : update,
        insert : insert,
        getData : getData,
        testConnection : testConnection
    }
};