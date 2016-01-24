'use strict';

/* jshint -W098 */
angular.module('mean.requests').controller('RequestsController', ['$scope', 'Global',
    'Requests', '$state', '$stateParams', 'UserRequests',
  function($scope, Global, Requests, $state, $stateParams, UserRequests) {
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
          if(!$stateParams.isUserPending || $stateParams.isUserPending === null || typeof $stateParams.isUserPending === 'undefined' || $stateParams.isUserPending === 'false' ) {
              Requests.query({
                  status: $stateParams.status,
                  user: $stateParams.user
              }, function (requests) {
                  $scope.requests = requests;
              });
          } else {
              UserRequests.query({
                  user: $stateParams.user
              }, function (requests) {
                  $scope.requests = requests;
              });
          }

      };
  }
]);
