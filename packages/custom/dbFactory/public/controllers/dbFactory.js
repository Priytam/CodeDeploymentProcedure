'use strict';

/* jshint -W098 */
angular.module('mean.dbFactory').controller('DbFactoryController',
    ['$scope', 'Global', 'DbFactory', '$uibModalInstance', 'db', 'operationType', 'QueryConnection', 'QueryService',
  function($scope, Global, DbFactory, $uibModalInstance, db, operationType, QueryConnection, QueryService) {

      $scope.global = Global;
      $scope.operationType = operationType;
      $scope.package = {
          name: 'dbFactory'
      };

      $scope.dbList = {};
      $scope.serviceTypes = ['mysql', 'mssql'];

      $scope.isDbNotSelected = function () {
          return (angular.equals({}, db) && $scope.operationType === 'update');
      };

      if ($scope.operationType === 'update') {
          $scope.dbList = db;
      }

      $scope.dismiss = function () {
          $uibModalInstance.dismiss();
      };

      $scope.create = function (isValid) {
          if (isValid) {
              var db = new DbFactory($scope.dbList);
              db.$save(function (response) {
                  response.taskMessage = 'DB added successfully ...';
                  $uibModalInstance.close(response);
              });
              $scope.dbList = {};
          } else {
              $scope.submitted = true;
          }
      };

      $scope.makeArrayOfSO = function () {
          $scope.dbList.secondaryOwner = $scope.dbList.secondaryOwner.split(',');
      };

      $scope.update = function () {
          $scope.dbList.$update(function (response) {
              response.taskMessage = 'DB updated successfully';
              $uibModalInstance.close(response);
          }, function (err) {
              $scope.statusText = err.statusText;
              $scope.errorMessage = err.data.message;
          });

      };

      $scope.closeAlert = function () {
          $scope.errorMessage = undefined;
      };

      $scope.closeConnectionAlert = function () {
          $scope.connection = undefined;
      };

      $scope.testConnection = function () {
          $scope.connection = {};
          $scope.connection.successMessage = 'dataBase is Connected';
          var qString = new QueryConnection($scope.dbList);
          qString.$testConnection(function (response) {
              $scope.connection.response = response;
          });
      };

      $scope.testConnectionCreated = function () {
          $scope.connection = {};
          $scope.connection.successMessage = 'dataBase is Connected';
          var qString = new QueryService($scope.dbList);
          qString.$testConnection(function (response) {
              $scope.connection.response = response;
          });
      }
  }
]);
