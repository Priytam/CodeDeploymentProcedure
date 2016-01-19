/**
 * Created by pjpandey on 1/19/2016.
 */

var mysql = require('mysql');

module.export = function() {

    function query(data , cb) {
        var connection = mysql.createConnection({
            host     : data.host,
            port     : data.port,
            user     : data.username,
            password : data.password,
            database : data.dbName
        });

        connection.connect();

        connection.query(data.query,function(err, rows) {
           if(err){
               return cb(err)
           }
            return cb(null, rows);
        });
    }

    return {
        query : query
    }
};