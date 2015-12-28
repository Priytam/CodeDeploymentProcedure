/**
 * Created by arkulkar on 12/21/2015.
 */
angular.module('mean.execStepsFactory').controller('CreatePlanModalController', ['$scope', '$modalInstance',
    'AddStepFactory',

    function($scope, $modalInstance, AddStepFactory) {

        $scope.executionPlan = {};

        $scope.addAPlan = function(isValid) {
            if (isValid && $scope.executionPlan !== undefined) {
                AddStepFactory.setPlan($scope.executionPlan);
                $modalInstance.close();
            } else {
                $scope.submitted = true;
            }
        };

        $scope.dismiss = function(){
            $modalInstance.dismiss();
        }
    }
]);