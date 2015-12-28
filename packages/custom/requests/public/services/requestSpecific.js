/**
 * Created by pjpandey on 12/27/2015.
 */
'use strict';

angular.module('mean.requests').factory('RequestsSpecific', [ '$resource',
    function($resource) {
        return $resource('/api/stepType/:stepId', {
            reqID: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            collect: {
                method: 'POST',
                isArray: false
            }
        });
    }
]);