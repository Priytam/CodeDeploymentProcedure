'use strict';

/* jshint -W098 */
angular.module('mean.requests').controller('StepViewController', ['$scope', 'Global', 'Requests', '$state', '$stateParams', 'RequestsSpecific',
  function($scope, Global, Requests, $state, $stateParams, RequestsSpecific) {
      $scope.global = Global;
      $scope.package = {
          name: 'requests'
      };
      $scope.reqId =  $stateParams.id;
      $scope.stepId = $stateParams.stepId;

      if( $stateParams.step === null) {
          RequestsSpecific.get({
              stepId : $stateParams.stepId
          }, function(step) {
              $scope.step = step;
          });
      } else {
          $scope.step = $stateParams.step;
      }
  }
]);
