/**
 * Created by pjpandey on 1/19/2016.
 */
angular.module('mean.requests').factory('QueryService', [ '$resource',
    function($resource) {
        return $resource('/api/query/:queryId', {
            queryId: '@_id'
        }, {
            query : {
                method: 'POST',
                isArray: false
            },
            testConnection : {
                method: 'POST',
                isArray: false
            }
        });
    }
]).factory('QueryConnection', [ '$resource',
    function($resource) {
        return $resource('/api/connection/:queryId', {
            queryId: '@_id'
        }, {
            testConnection : {
                method: 'POST',
                isArray: false
            }
        });
    }
]);