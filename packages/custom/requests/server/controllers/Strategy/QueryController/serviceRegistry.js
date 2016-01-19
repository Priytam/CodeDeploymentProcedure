/**
 * Created by pjpandey on 1/19/2016.
 */

var mysql = require('./mysql')(),
    mssql = require('./mssql')();

module.exports = function(queryStrategy){

    function registerServices() {
        console.log(queryStrategy);
        queryStrategy.registerService('mysql', mysql);
        queryStrategy.registerService('mssql', mssql);
        console.log(queryStrategy);
    }
    return {
        registerServices : registerServices
    }
};
