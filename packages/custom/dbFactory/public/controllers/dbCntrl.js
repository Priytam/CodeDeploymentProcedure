
'use strict';
/**
 * Created by pjpandey on 1/5/2016.
 */
angular.module('mean.dbFactory').controller('dbController', ['$scope', 'Global', 'ExecStepsFactory',
    '$uibModal', 'AddStepFactory', 'DbFactory',
    function($scope, Global, EPDB, $uibModal, AddStepFactory, DbFactory) {
        $scope.global = Global;
        $scope.package = {
            name: 'execStepsFactory'
        };

        $scope.addADB = function () {
            $uibModal.open({
                templateUrl: 'dbFactory/views/createDbModal.html',
                controller: 'DbFactoryController',
                size: 'wide'
            }).result.then(function (db) {
                    //console.log(db);
                    $scope.addedDb = db;
                });
        };

        $scope.find = function() {
            EPDB.query(function(plans) {
                $scope.eps = plans;
            });
            DbFactory.query(function(dataBases){
                $scope.dbs = dataBases;
            });
        };
    }
]);
