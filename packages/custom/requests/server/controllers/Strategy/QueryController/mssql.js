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

        //var string = 'mssql://'+connectionString.username+':' + connectionString.password + '@' + connectionString.host + ':'+ connectionString.port + '/' +connectionString.dbName;

            console.log(config);

        mssql.connect(config).then(function() {
            var request = new mssql.Request();
            request.query(queryString).then(function(records) {
                return cb(null, records);
            }).catch(function(err) {
                return cb(err);
            });
        }).catch(function(err) {
            console.log('I am here ---------------------------');
            return cb(err);
        });
    }

    return {
        query : query
    }
};