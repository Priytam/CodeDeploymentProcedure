'use strict';

/* jshint -W098 */
angular.module('mean.createRequest').controller('CreateRequestController', ['$scope', 'Global', 'CreateRequest',
  'ExecStepsFactory', '$state',
  function($scope, Global, CreateRequest, ExecStepsFactory, $state) {
    $scope.global = Global;
    $scope.package = {
      name: 'createRequest'
    };

    $scope.changeSelectedPlan = function(plan){
      //$scope.plan = plan;
      $state.go('home.requestForm', {myPlan : plan, id : plan._id});
    };

    $scope.findPlans = function() {
      ExecStepsFactory.query(function(plans) {
        $scope.plans = plans;
      });
    };
  }
]);
