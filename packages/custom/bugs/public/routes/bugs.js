'use strict';

angular.module('mean.bugs').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('home.bugs', {
      url: '/bugs',
      templateUrl: 'bugs/views/bugs.html'
    });
  }
]);
