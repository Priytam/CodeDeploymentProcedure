/**
 * Created by arkulkar on 12/21/2015.
 */
angular.module('mean.execStepsFactory').controller('CreatePlanModalController', ['$scope', '$uibModalInstance',
    'AddStepFactory',

    function($scope, $uibModalInstance, AddStepFactory) {

        $scope.executionPlan = {};

        $scope.addAPlan = function(isValid) {
            if (isValid && $scope.executionPlan !== undefined) {
                AddStepFactory.setPlan($scope.executionPlan);
                $uibModalInstance.close();
            } else {
                $scope.submitted = true;
            }
        };

        $scope.dismiss = function(){
            $uibModalInstance.dismiss();
        }
    }
]);