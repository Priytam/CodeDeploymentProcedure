'use strict';

angular.module('mean.execStepsFactory').factory('ExecStepsFactory', ['$resource',
  function($resource) {
    return $resource('api/epFactory/:epId', {
      epId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
