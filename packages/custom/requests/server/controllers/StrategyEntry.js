/**
 * Created by pjpandey on 12/30/2015.
 */


var approval = require('./ApprovalStrategy')(),
    query = require('./QueryStrategy')(),
    upload = require('./UploadStrategy')();


module.exports = function(factory) {

    function registerAll() {
        factory.registerStrategy('Approval', approval);
        factory.registerStrategy('Query', query);
        factory.registerStrategy('Upload', upload);
    }

    return {
        registerAll : registerAll
    }
};

