'use strict';

/* jshint -W098 */
angular.module('mean.requests').controller('StepViewController', ['$scope', 'Global', 'Requests', '$state', '$stateParams',
    'RequestsSpecific', '$window', 'QueryService', 'Authentication', '$interval',
  function($scope, Global, Requests, $state, $stateParams, RequestsSpecific, $window, QueryService, Authentication, $interval) {
      $scope.global = Global;
      $scope.package = {
          name: 'requests'
      };
      $scope.reqId =  $stateParams.id;
      $scope.stepId = $stateParams.stepId;
      $scope.files = [];
      $scope.queryData = {};
      $scope.queryData.refreshing = false;
      $scope.isApproval = false;
      $scope.isOwner = false;
      $scope.isGridTrue = false;

      if( $stateParams.step === null) {
          RequestsSpecific.get({
              stepId : $stateParams.stepId,
              type : $stateParams.type
          }, function(step) {
              $scope.step = step;
              if($scope.step.type === 'Query') {
                  $scope.queryData.connectionString = JSON.parse($scope.step.connectionString);
              }
              $scope.queryData.queryString = $scope.step.queryString;
              var date = new Date();
              $scope.destination = '/docs_'+$scope.step.plan+'_'+date.getFullYear()+'_'+date.getMonth() + 1 +'_'+date.getDay()+'_'+date.getHours()+'_'+date.getMinutes()+'_'+date.getSeconds()+'/';
              manageAccess();
          });
      } else {
          $scope.step = $stateParams.step;
          if($scope.step.type === 'Query') {
              $scope.queryData.connectionString = JSON.parse($scope.step.connectionString);
          }
          $scope.queryData.queryString = $scope.step.queryString;
          var date = new Date();
          $scope.destination = '/docs_'+$scope.step.plan+'_'+date.getFullYear()+'_'+date.getMonth() + 1 +'_'+date.getDay()+'_'+'_'+date.getHours()+'_'+date.getMinutes()+'_'+date.getSeconds()+'/';
          manageAccess();
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


      //////////////////////upload////////////////////////////////

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
      };


////////////////////////////Query//////////////////////////////////////////
      $scope.updateQueryString = function() {
          $scope.step.queryString = $scope.queryData.queryString;
          $scope.step.status = 'INPROGRESS';
          $scope.step.currentStateNumber = 2;
          $scope.step.state = 'QuerySaved';
          var  step = new RequestsSpecific($scope.step);
          step.$update(function(res){
              $window.location.reload();
          });
      };

      $scope.query = function() {
          $scope.queryData.refreshing = true;
          var service = new QueryService({
              queryString: $scope.queryData.queryString,
              connectionString: $scope.step.connectionString,
              type: $scope.step.type
          });
          service.$query(function (response) {
              $scope.queryData.refreshing = false;
              $scope.result = response;
              if(response.output){
                  $scope.step.queryString = $scope.queryData.queryString;
                  configGridOption(response.output);
                  $scope.step.isSuccess = true;
                  var  step = new RequestsSpecific($scope.step);
                  step.$update();
              }
          });
      };
        //editor
      $scope.aceLoaded = function(_editor){
          var _session = _editor.getSession();
          var _renderer = _editor.renderer;
          _editor.setReadOnly(false);
          _editor.setFontSize(16);
          _session.setUndoManager(new ace.UndoManager());
          _renderer.setShowGutter(true);
          _session.setMode("ace/mode/mysql");
          // Events
          _editor.on("changeSession", function(){
              //console.log('changeSession');
          });
          _session.on("change", function() {
             // console.log('change');
          });
      };
      //grid view
      function configGridOption(output) {
          var columnDefs = [];
          angular.forEach(output[0], function(value, key) {
              if(this.length < 5) {
                  this.push({field : key, visible : true});
              } else {
                  this.push({field : key, visible: false});
              }
          }, columnDefs);
          console.log(columnDefs);
          $scope.gridOptions = {
              enableSorting: true,
              columnDefs: columnDefs,
              data : output,
              //showGroupPanel: true,
              showColumnMenu: true,
              enableGridMenu: true,
              exporterMenuPdf: false,
              paginationPageSize: 25,
              exporterCsvFilename: 'cdp_db_download.csv',
              exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
              onRegisterApi: function( gridApi ){
                  $scope.gridApi = gridApi;
                  $scope.gridApi.core.refresh();
              }
          };
          $scope.isGridTrue = true;
      }

      ///////////////////Access///////////////////////////////////////////////
      function manageAccess(){
          if(Authentication.user.username === $scope.step.user && Authentication.user.email === $scope.step.email){
              $scope.isOwner = true;
          }
          if($scope.step.type=='Approval'){
              angular.forEach($scope.step.values,function(value){
                  if(Authentication.user.email === value){
                      $scope.isApproval = true;
                  }
              }, $scope.isApproval);
          }

      }

      ////////////////////////////////
  }
]);
