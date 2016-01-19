/**
 * Created by pjpandey on 12/30/2015.
 */
module.exports =  function () {

    var serviceList = {};
    function registerService(serviceName , service){
        serviceList[serviceName] = service;
    }

    function processStep() {
        console.log('I am approval ');
    }

    function query() {

    }

    return {
        registerService : registerService,
        processData :  processStep,
        query : query
    }
};