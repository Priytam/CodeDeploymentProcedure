'use strict';

/* jshint -W098 */
angular.module('mean.dbFactory').controller('DbFactoryController',
    ['$scope', 'Global', 'DbFactory', '$uibModalInstance', 'db', 'operationType',
  function($scope, Global, DbFactory, $uibModalInstance, db, operationType) {

    $scope.global = Global;
    $scope.operationType = operationType;
    $scope.package = {
      name: 'dbFactory'
    };

    $scope.isDbNotSelected = function() {
        return angular.equals({},db);
    };

    if(operationType === 'update'){
      $scope.dbList = db;
    }

    $scope.dismiss = function() {
        $uibModalInstance.dismiss();
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var db = new DbFactory($scope.dbList);
        db.$save(function(response) {
            response.taskMessage = 'DB added successfully ...';
            $uibModalInstance.close(response);
        });
        $scope.dbList = {};
      } else {
        $scope.submitted = true;
      }
    };

    $scope.update = function(isValid){
      if(isValid) {
        $scope.dbList.$update(function(response){
          response.taskMessage = 'DB updated successfully';
          $uibModalInstance.close(response);
        })
      } else {
        $scope.submitted = true;
      }
    };
  }
]);
