/**
 * Created by pjpandey on 12/30/2015.
 */
var mongoose = require('mongoose'),
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

    function processStep() {

    }

    function query(connectionString, queryString, cb) {
        var service = serviceList[connectionString.serviceType];
        service.query(connectionString, queryString, function(err, response){
            if(err)
                return cb(err);
            return cb(null, response)
        })
    }

    function insert(reqData, name, user, done) {
        var data = {
            queryString : reqData.values[0],
            connectionString : reqData.connectionString,
            name : name,
            plan : reqData.name,
            'executionNumber': reqData.executionNumber,
            'isFirst': reqData.isFirst,
            'isLast': reqData.isLast
        };
        var approval = new QueryDB(data);
        approval.user = user;
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
            var approval = result;
            approval = _.extend(approval,step);
            approval.save(function(err) {
                if (err) {
                    return cb(err);
                }
                cb(null, approval);
            });
        });
    }

    return {
        registerService : registerService,
        processData :  processStep,
        query : query,
        update : update,
        insert : insert,
        getData : getData
    }
};