'use strict';

angular.module('mean.requests').factory('Requests', [ '$resource',
    function($resource) {
        return $resource('api/request/:reqID', {
                reqID: '@_id'
            }, {
                update: {
                    method: 'PUT'
                },
                process: {
                    method: 'POST'
                }
        });
    }
]);
