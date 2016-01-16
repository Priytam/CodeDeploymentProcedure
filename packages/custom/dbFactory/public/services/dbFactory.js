'use strict';

angular.module('mean.dbFactory').factory('DbFactory', ['$resource',
  function($resource) {
    return $resource('api/dbFactory/:dbId', {
      dbId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
