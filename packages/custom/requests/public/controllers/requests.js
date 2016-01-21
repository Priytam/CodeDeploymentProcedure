'use strict';

/* jshint -W098 */
angular.module('mean.requests').controller('RequestsController', ['$scope', 'Global',
    'Requests', '$state', '$stateParams',
  function($scope, Global, Requests, $state, $stateParams) {
      $scope.global = Global;
      $scope.package = {
          name: 'requests'
      };
      $scope.requests = [];
      $scope.openDetailView = function(request){
          $state.go('home.requestDetail', {request : request, id : request._id});
      };

      $scope.searchInput = '';

      $scope.findRequests = function() {
          Requests.query({
              status : $stateParams.status,
              user : $stateParams.user
          }, function(requests) {
              $scope.requests = requests;
          });
      };
  }
]);
