'use strict';

angular.module('mean.dbFactory').factory('DbFactory', ['$resource',
  function($resource) {
    return $resource('api/dbFactory/:dbId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
