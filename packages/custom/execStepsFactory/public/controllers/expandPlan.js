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

        $scope.save = function(){
            $scope.plan.$update(function(response) {
                $scope.plan = response;
                $uibModalInstance.close('Plan update successfully');
            }, function(err) {
                $scope.statusText =  err.statusText;
                $scope.errorMessage = err.data.message;
            });

        };

        $scope.closeErrorAlert = function() {
            $scope.errorMessage = undefined;
        };

        $scope.removeStep = function(index){
            for(var i = index ; i < $scope.plan.steps.length; i++ ){
                $scope.plan.steps[i].stepNumber = $scope.plan.steps[i].stepNumber - 1;
            }
            $scope.plan.steps.splice(index,1);
        };
    }
]);