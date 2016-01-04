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
              stepId : $stateParams.stepId,
              type : $stateParams.type
          }, function(step) {
              $scope.step = step;
          });
      } else {
          $scope.step = $stateParams.step;
      }


      $scope.processStep = function(step) {
          Requests.get({reqID : $stateParams.id}, function(request) {
              var new_request = new Requests(request);
              new_request.$process({stepId : step._id, type : step.type});
          });
      }
  }
]);
