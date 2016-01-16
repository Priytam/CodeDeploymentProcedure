/**
 * Created by arkulkar on 1/15/2016.
 */
angular.module('mean.dbFactory').controller('confirmDeleteDBController',['$scope',
    '$uibModalInstance', 'db',

    function($scope, $uibModalInstance, db){
        $scope.isEmpty = false;
        $scope.db = db;
        if(angular.equals({},$scope.db)){
            $scope.isEmpty = true;
        }
        $scope.dismiss = function(){
            $uibModalInstance.dismiss();
        };

        $scope.ok = function(){
            $scope.db.$remove(function(response) {
                $uibModalInstance.close();
            });

        };
    }
]);