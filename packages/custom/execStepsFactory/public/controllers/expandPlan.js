/**
 * Created by arkulkar on 1/15/2016.
 */
angular.module('mean.execStepsFactory').controller('expandPlanController',['$scope',
    '$uibModalInstance', 'plan', 'operationType',

    function($scope, $uibModalInstance, plan, operationType){
        $scope.isEmpty = false;
        $scope.plan = plan;
        $scope.operationType = operationType;

        if(angular.equals({},$scope.plan)){
            $scope.isEmpty = true;
        }

        $scope.dismiss = function(){
            $uibModalInstance.dismiss();
        };

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        $scope.openStatus = [];
    }
]);