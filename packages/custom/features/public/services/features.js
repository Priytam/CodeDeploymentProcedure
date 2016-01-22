'use strict';

angular.module('mean.features').factory('Features', ['$resource',
  function($resource) {
    return $resource('api/features/:featureId', {
      featureId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);