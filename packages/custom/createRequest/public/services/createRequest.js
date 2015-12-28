'use strict';

angular.module('mean.createRequest').factory('CreateRequest', [ '$resource',
  function($resource) {
    return $resource('api/createRequest/:dbId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
