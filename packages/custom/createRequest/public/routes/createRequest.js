'use strict';

angular.module('mean.createRequest').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
        .state('home.createRequest', {
          url: '/createRequest',
          parent: 'home',
          templateUrl: 'createRequest/views/createRequest.html'
        })
        .state('home.requestForm', {
          url: '/requestForm/:id',
          parent:'home',
          params : {myPlan : null},
          templateUrl: 'createRequest/views/requestForm.html'
        });

  }
]);
