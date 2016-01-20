'use strict';

/* jshint -W098 */
angular.module('mean.requests').controller('RequestsController', ['$scope', 'Global', 'Requests', '$state',
  function($scope, Global, Requests, $state) {
      $scope.global = Global;
      $scope.package = {
          name: 'requests'
      };

      $scope.openDetailView = function(request){
          $state.go('home.requestDetail', {request : request, id : request._id});
      };

      $scope.searchInput = '';

      $scope.findRequests = function() {
          Requests.query(function(requests) {
              $scope.requests = requests;
          });
      };
  }
]);
