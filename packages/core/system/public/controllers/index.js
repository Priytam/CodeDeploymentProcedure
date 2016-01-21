'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', 'ExecStepsFactory',
    'Requests', 'Bugs', 'Features', 'DbFactory', 'Authentication',
  function($scope, Global, ExecStepsFactory, Requests, Bugs, Features, DbFactory, Authentication) {
      $scope.global = Global;

      ExecStepsFactory.query(function(plans) {
          $scope.plans = plans.length;
      });

      Requests.query(function(requests) {
          $scope.requests = requests.length;
      });

      DbFactory.query(function(response){
          $scope.dbs = response.length;
      });

      Bugs.query(function(response){
          $scope.bugs = response.length;
      });

      Features.query(function(response){
          $scope.features = response.length;
      });

      $scope.currentUser = Authentication.user.username;
      console.log($scope.currentUser);

      Requests.query({user : $scope.currentUser},function(requests) {
          $scope.myRequests = requests.length;
      });
  }
]);
