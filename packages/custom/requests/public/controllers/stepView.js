'use strict';

/* jshint -W098 */
angular.module('mean.requests').controller('StepViewController', ['$scope', 'Global', 'Requests', '$state', '$stateParams',
    'RequestsSpecific', '$window',
  function($scope, Global, Requests, $state, $stateParams, RequestsSpecific, $window) {
      $scope.global = Global;
      $scope.package = {
          name: 'requests'
      };
      $scope.reqId =  $stateParams.id;
      $scope.stepId = $stateParams.stepId;
      $scope.files = [];

      if( $stateParams.step === null) {
          RequestsSpecific.get({
              stepId : $stateParams.stepId,
              type : $stateParams.type
          }, function(step) {
              $scope.step = step;
              var date = new Date();
              $scope.destination = '/docs_'+$scope.step.plan+'_'+date.getFullYear()+'_'+date.getMonth() + 1 +'_'+date.getDay()+'_'+date.getHours()+'_'+date.getMinutes()+'_'+date.getSeconds()+'/';

          });
      } else {
          $scope.step = $stateParams.step;
          var date = new Date();
          $scope.destination = '/docs_'+$scope.step.plan+'_'+date.getFullYear()+'_'+date.getMonth() + 1 +'_'+date.getDay()+'_'+'_'+date.getHours()+'_'+date.getMinutes()+'_'+date.getSeconds()+'/';
      }

      $scope.processStep = function(step) {
          Requests.get({reqID : $stateParams.id}, function(request) {
              var new_request = new Requests(request);
              new_request.$process({stepId : step._id, type : step.type},function(response) {
                  $window.location.reload();
              });
          });
      };

      $scope.isEmpty = function(){
        return angular.equals([], $scope.step.values[0]);
      };

      $scope.uploadFileCallback = function(file) {
          $scope.files.push(file);
      };

      $scope.uploadFinished = function(files) {
          $scope.step.values = [];
          angular.forEach(files,function(file){
              $scope.step.values.push(file);
          },$scope.step.values);
          $scope.step.status = 'INPROGRESS';
          $scope.step.currentStateNumber =  1;
          var  step = new RequestsSpecific($scope.step);
          step.$update(function(res){
              $window.location.reload();
          });
      }
  }
]);
