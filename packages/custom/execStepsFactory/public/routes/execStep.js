'use strict';

angular.module('mean.execStepsFactory').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('home.execStepsFactory', {
      url: '/execStepsFactory',
      parent: 'home',
      templateUrl: 'execStepsFactory/views/createExecPlan.html'
    });
  }
]);
