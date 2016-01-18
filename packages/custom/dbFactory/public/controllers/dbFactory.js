'use strict';

/* jshint -W098 */
angular.module('mean.dbFactory').controller('DbFactoryController', ['$scope', 'Global', 'DbFactory', '$uibModalInstance',
  function($scope, Global, DbFactory, $uibModalInstance) {

    $scope.global = Global;
    $scope.package = {
      name: 'dbFactory'
    };

    $scope.dismiss = function() {
        $uibModalInstance.dismiss();
    };

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.article.permissions.push('test test');
        var db = new DbFactory($scope.dbList);
        db.$save(function(response) {
          $scope.db = response;
            $uibModalInstance.close($scope.db);
        });
        $scope.dbList = {};
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      DB.query(function(dbs) {
        $scope.dbs = dbs;
      });
    };

    $scope.findOne = function() {
      DB.get({
       // articleId: $scope.db_id
      }, function(db) {
        $scope.db = db;
      });
    };
  }
]);
