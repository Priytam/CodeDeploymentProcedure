'use strict';

/* jshint -W098 */
angular.module('mean.createRequest').controller('CreateRequestController', ['$scope', 'Global', 'CreateRequest',
  'ExecStepsFactory', '$state', 'Requests', 'Features',
  function($scope, Global, CreateRequest, ExecStepsFactory, $state, Requests, Features) {
      $scope.global = Global;
      $scope.package = {
          name: 'createRequest'
      };

      $scope.searchInput = '';
      $scope.plans = [];
      $scope.changeSelectedPlan = function (plan) {
          //$scope.plan = plan;
          $state.go('home.requestForm', {myPlan: plan, id: plan._id});
      };

      Features.query(function(response){
          $scope.features = response.length;
      });

      $scope.findInitialData = function () {

          ExecStepsFactory.query(function (plans) {
              $scope.plans = plans;
          });

          Requests.query(function (requests) {
              $scope.notCompleted = 0;
              angular.forEach(requests, function(value, key){
                  if(value.status !== "FINISHED") {
                      $scope.notCompleted = $scope.notCompleted + 1;
                  }
              }, $scope.notCompleted);
              $scope.completed = requests.length - $scope.notCompleted;
          });
      };
  }
]);
