
'use strict';
/**
 * Created by pjpandey on 1/5/2016.
 */
angular.module('mean.dbFactory').controller('dbController', ['$scope', 'Global', 'ExecStepsFactory',
    '$uibModal', 'AddStepFactory', 'DbFactory', 'QueryService',
    function($scope, Global, EPDB, $uibModal, AddStepFactory, DbFactory, QueryService) {
        $scope.global = Global;
        var selectedBD = {};
        $scope.package = {
            name: 'execStepsFactory'
        };

        $scope.dbs = [];
        $scope.isGridTrue = false;

        $scope.addADB = function (type) {
            $uibModal.open({
                templateUrl : 'dbFactory/views/createDbModal.html',
                controller : 'DbFactoryController',
                windowClass : 'medium-Modal',
                resolve : {
                    db : function(){
                        return selectedBD;
                    },
                    operationType : function(){
                        return type;
                    }
                }
            }).result.then(function (db) {
                    if(type === 'create'){
                        $scope.dbs.unshift(db);
                    }
                    $scope.taskMessage = db.taskMessage;
                });
        };

        $scope.selectBD = function(db){
            selectedBD = db;
        };

        $scope.openConfirmDialog = function(){
            $uibModal.open({
                templateUrl : 'dbFactory/views/confirmDeleteDBModal.html',
                controller : 'confirmDeleteDBController',
                windowClass : 'medium-Modal',
                backdrop : 'static',
                resolve: {
                    db : function() {
                        return selectedBD;
                    }
                }
            }).result.then(removeDB)
        };

        function removeDB(){
            $scope.dbs.splice($scope.dbs.indexOf(selectedBD), 1);
            $scope.taskMessage = "DB removed successfully ...";
        }

        $scope.closeAlert = function() {
            $scope.taskMessage = undefined;
        };

        $scope.find = function() {
            DbFactory.query(function(dataBases){
                $scope.dbs = dataBases;
            });
        };

        $scope.closeConnectionAlert = function() {
            $scope.connection = undefined;
        };

        $scope.testConnection = function() {
            $scope.connection = {};
            $scope.connection.successMessage = 'dataBase is Connected';
            if(!angular.equals({}, selectedBD)){
                var qString =  new QueryService(selectedBD);
                qString.$testConnection(function(response){
                    $scope.connection.response = response;
                });
            } else {
                $scope.connection.selectionError = 'No db selected , select a db from table and try again';
            }
        };

        ///////////////////////query a data ////////////////
        $scope.queryData = {};
        $scope.query = function() {
            $scope.queryData.refreshing = true;
            var service = new QueryService({
                connectionString: JSON.stringify($scope.queryData.connectionString),
                queryString: $scope.queryData.queryString,
                type: 'Query'
            });
            service.$query(function (response) {
                $scope.queryData.refreshing = false;
                $scope.result = response;
                configGridOption(response.output);
            });
        };
        //editor
        $scope.aceLoaded = function(_editor){
            var _session = _editor.getSession();
            var _renderer = _editor.renderer;
            _editor.setReadOnly(false);
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
            $scope.gridOptions1 = {
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

    }
]);


