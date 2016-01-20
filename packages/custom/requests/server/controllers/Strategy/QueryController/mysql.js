/**
 * Created by pjpandey on 1/19/2016.
 */

var mysql = require('mysql');

module.exports = function() {

    function query(connectionString, queryString , cb) {
        var connection = mysql.createConnection({
            host     : connectionString.host,
            port     : connectionString.port,
            user     : connectionString.username,
            password : connectionString.password,
            database : connectionString.dbName
        });
        connection.connect();
        connection.query(queryString, function(err, rows) {
           if(err){
               return cb(err)
           }
           return cb(null, rows);
        });
    }

    function testConnection(req, cb){
        var connection = mysql.createConnection({
            host     : req.host,
            port     : req.port,
            user     : req.username,
            password : req.password,
            database : req.dbName
        });
        connection.connect(function(err){
            if(err){
                return cb(null, {isConnected : false, error : err })
            }
            return cb(null, {isConnected : true, error : null })
        });
    }
    return {
        query : query,
        testConnection : testConnection
    }
};