
'use strict';
/**
 * Created by pjpandey on 1/5/2016.
 */
angular.module('mean.dbFactory').controller('dbController', ['$scope', 'Global', 'ExecStepsFactory',
    '$uibModal', 'AddStepFactory', 'DbFactory',
    function($scope, Global, EPDB, $uibModal, AddStepFactory, DbFactory) {
        $scope.global = Global;
        var selectedBD = {};
        $scope.package = {
            name: 'execStepsFactory'
        };

        $scope.dbs = [];

        $scope.addADB = function () {
            $uibModal.open({
                templateUrl: 'dbFactory/views/createDbModal.html',
                controller: 'DbFactoryController',
                size: 'wide'
            }).result.then(function (db) {
                    //console.log(db);
                    $scope.addedDb = db;
                    $scope.dbs.unshift(db);
                    $scope.taskMessage = "DB added successfully ...";
                });
        };

        $scope.selectBD = function(db){
            selectedBD = db;
        };

        $scope.openConfirmDialog = function(){
            $uibModal.open({
                templateUrl : 'dbFactory/views/confirmDeleteDBModal.html',
                controller : 'confirmDeleteDBController',
                size : 'wide',
                resolve: {
                    db: function() {
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
    }
]);
