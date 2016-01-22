'use strict';

angular.module('mean.bugs').factory('Bugs', ['$resource',
  function($resource) {
    return $resource('api/bug/:bugId', {
      bugId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
