'use strict';

/* jshint -W098 */
angular.module('mean.bugs').controller('BugsController', ['$scope', 'Global', 'Bugs',
  function($scope, Global, Bugs) {
    $scope.global = Global;
    $scope.package = {
      name: 'bugs'
    };

    $scope.find = function () {
      Bugs.query(function(response){
        $scope.bugs = response;
      },function(err) {
        $scope.statusText =  err.statusText;
        $scope.errorMessage = err.data.message;
      });

    };

    $scope.closeErrorAlert = function() {
      $scope.errorMessage = undefined;
    };

  }
]);
