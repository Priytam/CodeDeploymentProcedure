
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
    }
]);


