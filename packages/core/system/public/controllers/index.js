'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'ExecStepsFactory', 'Requests',
  function($scope, Global, ExecStepsFactory, Requests) {
      $scope.global = Global;

      ExecStepsFactory.query(function(plans) {
          $scope.plans = plans.length;
      });

      Requests.query(function(requests) {
          $scope.requests = requests.length;
      });
  }
]);
