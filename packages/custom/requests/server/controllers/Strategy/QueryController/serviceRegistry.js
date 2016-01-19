/**
 * Created by pjpandey on 1/19/2016.
 */

var mysql = require('./mysql'),
    mssql = require('./mssql');
module.exports = function(queryStrategy){

    function registerServices() {
        queryStrategy.registerService('mysql', mysql);
        queryStrategy.registerService('mssql', mssql);
    }

    return {
        registerServices : registerServices
    }
};
