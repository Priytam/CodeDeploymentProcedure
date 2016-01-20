/**
 * Created by pjpandey on 1/19/2016.
 */
var mssql = require('mssql');
module.exports  = function() {

    function query(connectionString, queryString , cb) {
        var config = {
            server   : connectionString.host,
            port     : connectionString.port,
            user     : connectionString.username,
            password : connectionString.password,
            database : connectionString.dbName
        };

        mssql.connect(config).then(function() {
            var request = new mssql.Request();
            request.query(queryString).then(function(records) {
                return cb(null, records);
            }).catch(function(err) {
                return cb(err);
            });
        }).catch(function(err) {
            return cb(err);
        });
    }

    function testConnection(req, cb){
        var config = {
            server   : req.host,
            port     : req.port,
            user     : req.username,
            password : req.password,
            database : req.dbName
        };

        mssql.connect(config).then(function() {
            return cb(null, {isConnected : true, error : null })
        }).catch(function(err) {
            return cb(null , {isConnected : false, error : err });
        });
    }

    return {
        query : query,
        testConnection : testConnection
    }
};