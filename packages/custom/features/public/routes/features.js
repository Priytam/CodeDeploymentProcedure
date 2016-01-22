'use strict';

angular.module('mean.features').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('home.features', {
      url: '/features',
      templateUrl: 'features/views/features.html'
    });
  }
]);
