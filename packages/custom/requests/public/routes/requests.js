'use strict';

angular.module('mean.requests').config(['$stateProvider',
  function($stateProvider) {
      $stateProvider.state('home.requests', {
          url: '/requests',
          parent: 'home',
          params : {status : null},
          templateUrl: 'requests/views/requests.html'
      })
          .state('home.myRequests', {
              url: '/myRequests/:user/:isUserPending',
              parent: 'home',
              params : {user : null, isUserPending : 'false'},
              templateUrl: 'requests/views/requests.html'
          })

          .state('home.requestDetail', {
              url: '/requests/:id',
              parent: 'home',
              params: {request: null},
              templateUrl: 'requests/views/requestDetail.html'
          })
          .state('home.requestDetail.stepView', {
              url: '/step/:stepId/type/:type',
              parent: 'home.requestDetail',
              params: {step: null},
              templateUrl: 'requests/views/stepView.html'
          });
  }
]);
