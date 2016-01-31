
var oracle = require('oracledb');
module.exports  = function() {

    function query(connectionString, queryString , cb) {
        var server = connectionString.host;
        var port = connectionString.port;
        var database = connectionString.dbName;
        var config = {
            user: connectionString.username,
            password: connectionString.password,
            connectString: server + ':' + port + '/' + database
        };
        oracle.getConnection(config, function (err, connection) {
            if (err) {
                return cb(err);
            }
            connection.execute(queryString, function (err, result) {
                if (err) {
                    return cb(err);
                }
                result.rows = result.rows.map(function(row){
                    var temp = {};
                    for(var i =0 ; i < result.metaData.length; i++){
                        temp[result.metaData[i].name] = row[i];
                    }
                    return temp;
                });
                return cb(null, result.rows);
            });
        });
    }

    function testConnection(req, cb){
        var server = req.host;
        var port = req.port;
        var database = req.dbName;
        var config = {
            user: req.username,
            password: req.password,
            connectString: server + ':' + port + '/' + database
        };
        oracle.getConnection(config, function (err, connection) {
            if (err) {
                return cb(null, {isConnected: false, error: err});
            }
            return cb(null, {isConnected: true, error: null});
        })
    }

    return {
        query : query,
        testConnection : testConnection
    }
};