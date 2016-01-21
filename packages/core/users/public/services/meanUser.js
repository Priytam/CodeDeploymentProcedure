'use strict';

angular.module('mean.users').factory('MeanUser', [ '$rootScope', '$http', '$location',
  function($rootScope, $http, $location) {
      return {

          logUser: function (user) {
              return $http.post('/api/login', {
                  username : user.username,
                  email    : user.email,
                  roles    : ['owner']
              })
          }
      }
  }
]);
