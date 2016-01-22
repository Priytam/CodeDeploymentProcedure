'use strict';

/* jshint -W098 */
angular.module('mean.features').controller('FeaturesController', ['$scope', 'Global', 'Features',
  function($scope, Global, Features) {
    $scope.global = Global;
    $scope.package = {
      name: 'features'
    };

    $scope.find = function () {
      Features.query(function(response){
        $scope.features = response;
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
