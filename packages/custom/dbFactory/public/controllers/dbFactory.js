'use strict';

/* jshint -W098 */
angular.module('mean.dbFactory').controller('DbFactoryController', ['$scope', 'Global', 'DbFactory', '$modalInstance',
  function($scope, Global, DbFactory, $modalInstance) {

    $scope.global = Global;
    $scope.package = {
      name: 'dbFactory'
    };

    $scope.dismiss = function() {
      $modalInstance.dismiss();
    };

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.article.permissions.push('test test');
        var db = new DbFactory($scope.dbList);
        db.$save(function(response) {
          $scope.db = response;
          $modalInstance.close($scope.db);
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
