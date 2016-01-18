/**
 * Created by pjpandey on 12/30/2015.
 */
module.exports =  function () {

    function processStep() {
        console.log('I am approval ');
    }

    return {
        processData :  processStep
    }
};