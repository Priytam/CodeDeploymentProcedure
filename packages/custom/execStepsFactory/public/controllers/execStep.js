'use strict';

/* jshint -W098 */
angular.module('mean.execStepsFactory')
    .filter('isEmpty', [function() {
      return function(object) {
        return angular.equals({}, object);
      }
    }])
    .controller('ExecStepsFactoryController', ['$scope', 'Global', 'ExecStepsFactory',
  '$uibModal', 'AddStepFactory', 'DbFactory',
  function($scope, Global, EPDB, $uibModal, AddStepFactory, DbFactory) {

    $scope.global = Global;
    $scope.package = {
      name: 'execStepsFactory'
    };

    $scope.executionPlan = AddStepFactory.getPlan();
    $scope.executionPlan.steps = AddStepFactory.getSteps();
    $scope.selectedPlan = {};
    $scope.eps = [];
    $scope.isVisible = true;
    $scope.addAPlan = function() {
      $uibModal.open({
        templateUrl : 'execStepsFactory/views/createPlanModal.html',
        controller : 'CreatePlanModalController',
        size : 'wide'
        //windowClass: 'large-Modal'
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
      $scope.executionPlan.steps[$scope.executionPlan.steps.length-1].isLast = true;
      var ep = new EPDB($scope.executionPlan);
        ep.$save(function(response) {
          $scope.eps.unshift(response);
          $scope.taskMessage = "Plan added successfully ...";
        });
      $scope.isVisible = false;
      AddStepFactory.clearSteps();
      $scope.executionPlan.steps = [];
      $scope.executionPlan = {};
    };

    $scope.selectPlan = function(plan){
      $scope.selectedPlan = plan;
    };

    $scope.remove = function(){
      $scope.selectedPlan.$remove(function(response) {
        $scope.eps.splice($scope.eps.indexOf(response), 1);
        $scope.taskMessage = "Plan removed successfully ...";
      });
    };

    $scope.closeAlert = function() {
      $scope.taskMessage = undefined;
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
