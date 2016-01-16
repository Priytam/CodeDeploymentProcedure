/**
 * Created by arkulkar on 1/15/2016.
 */
angular.module('mean.execStepsFactory').controller('confirmDeletePlanController',['$scope',
    '$uibModalInstance', 'plan',

    function($scope, $uibModalInstance, plan){
        $scope.isEmpty = false;
        $scope.plan = plan;
        if(angular.equals({},$scope.plan)){
            $scope.isEmpty = true;
        }
        $scope.dismiss = function(){
            $uibModalInstance.dismiss();
        };

        $scope.ok = function(){
            $scope.plan.$remove(function(response) {
                $uibModalInstance.close();
            });

        };
    }
]);