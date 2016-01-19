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
            }
        });
    }
]);