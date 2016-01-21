'use strict';

/* jshint -W098 */
angular.module('mean.execStepsFactory')
  .controller('ExecStepsFactoryController', ['$scope', 'Global', 'ExecStepsFactory',
  '$uibModal', 'AddStepFactory', 'DbFactory',
  function($scope, Global, EPDB, $uibModal, AddStepFactory, DbFactory) {

      $scope.global = Global;
      $scope.package = {
          name: 'execStepsFactory'
      };

      $scope.dynamicPopover = {
          templateUrl: 'myPopoverTemplate.html'
      };


      $scope.executionPlan = AddStepFactory.getPlan();
      $scope.executionPlan.steps = AddStepFactory.getSteps();
      var selectedPlan = {};
      $scope.eps = [];
      $scope.isVisible = true;
      $scope.isEmpty = true;
      $scope.addAPlan = function () {
          $uibModal.open({
              templateUrl: 'execStepsFactory/views/createPlanModal.html',
              controller: 'CreatePlanModalController',
              windowClass: 'medium-Modal'
          })
              .result.then(updatePlan);
      };

      function updatePlan() {
          $scope.executionPlan = AddStepFactory.getPlan();
      }

      $scope.addAStep = function () {
          $uibModal.open({
              templateUrl: 'execStepsFactory/views/createStepModal.html',
              controller: 'CreateStepModalController',
              windowClass: 'medium-Modal'
          })
              .result.then(updateStep);
      };

      function updateStep() {
          $scope.executionPlan.steps = AddStepFactory.getSteps();
      }

      $scope.create = function () {
          $scope.executionPlan.steps[$scope.executionPlan.steps.length - 1].isLast = true;
          var ep = new EPDB($scope.executionPlan);
          ep.$save(function (response) {
              $scope.eps.unshift(response);
              $scope.taskMessage = "Plan added successfully ...";
          });
          $scope.isVisible = false;
          $scope.isEmpty = false;
          AddStepFactory.clearSteps();
          $scope.executionPlan.steps = [];
          $scope.executionPlan = {};
      };

      $scope.selectPlan = function (plan) {
          selectedPlan = plan;
      };

      $scope.showDetail = function (type) {
          $uibModal.open({
              templateUrl: 'execStepsFactory/views/expandPlanModal.html',
              controller: 'expandPlanController',
              windowClass: 'medium-Modal',
              resolve: {
                  plan: function () {
                      return selectedPlan;
                  },
                  operationType: function () {
                      return type;
                  }
              }
          }).result.then(updateTaskMessage)
      };

      function updateTaskMessage(msg) {
          selectedPlan = {};
          $scope.taskMessage = msg;
      }

      $scope.openConfirmDialog = function () {
          $uibModal.open({
              templateUrl: 'execStepsFactory/views/confirmDeletePlanModal.html',
              controller: 'confirmDeletePlanController',
              size: 'wide',
              resolve: {
                  plan: function () {
                      return selectedPlan;
                  }
              }
          }).result.then(removePlan)
      };

      function removePlan() {
          selectedPlan = {};
          $scope.eps.splice($scope.eps.indexOf(selectedPlan), 1);
          $scope.taskMessage = "Plan removed successfully ...";
      }

      $scope.closeAlert = function () {
          $scope.taskMessage = undefined;
      };

      $scope.find = function () {
          EPDB.query(function (plans) {
              $scope.eps = plans;
          }, function (err) {
              $scope.statusText = err.statusText;
              $scope.errorMessage = err.data.message;
          });

      };

      $scope.findOne = function () {
          EPDB.get({
              // articleId: $scope.db_id
          }, function (ep) {
              $scope.ep = ep;
          }, function (err) {
              $scope.statusText = err.statusText;
              $scope.errorMessage = err.data.message;
          });

      };

      $scope.closeErrorAlert = function () {
          $scope.errorMessage = undefined;
      }
  }
]);
