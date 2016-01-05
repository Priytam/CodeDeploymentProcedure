'use strict';

/* jshint -W098 */
angular.module('mean.execStepsFactory').controller('ExecStepsFactoryController', ['$scope', 'Global', 'ExecStepsFactory',
  '$uibModal', 'AddStepFactory', 'DbFactory',
  function($scope, Global, EPDB, $uibModal, AddStepFactory, DbFactory) {
    $scope.global = Global;
    $scope.package = {
      name: 'execStepsFactory'
    };

    $scope.executionPlan = AddStepFactory.getPlan();
    $scope.executionPlan.steps = AddStepFactory.getSteps();

    $scope.addAPlan = function() {
      $uibModal.open({
        templateUrl : 'execStepsFactory/views/createPlanModal.html',
        controller : 'CreatePlanModalController',
        size : 'wide'
      })
      .result.then(updatePlan);
    };

    function updatePlan(){
      $scope.executionPlan = AddStepFactory.getPlan();
    }

    $scope.addAStep = function() {
      $uibModal.open({
        templateUrl : 'execStepsFactory/views/createStepModal.html',
        controller : 'CreateStepModalController',
        size : 'wide'
      })
      .result.then(updateStep);
    };

    function updateStep(){
      $scope.executionPlan.steps = AddStepFactory.getSteps();
    }

    $scope.create = function() {
        var ep = new EPDB($scope.executionPlan);
        $scope.showPreview = false;
        ep.$save(function(response) {
          $scope.ep = response;
        });
      AddStepFactory.clearSteps();
      $scope.executionPlan.steps = [];
      $scope.executionPlan = {};
    };



    $scope.find = function() {
      EPDB.query(function(plans) {
        $scope.eps = plans;
      });
    };

    $scope.findOne = function() {
      EPDB.get({
        // articleId: $scope.db_id
      }, function(ep) {
        $scope.ep = ep;
      });
    };
  }
]);
