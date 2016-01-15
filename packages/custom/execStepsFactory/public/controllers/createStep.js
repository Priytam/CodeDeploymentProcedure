/**
 * Created by arkulkar on 12/21/2015.
 */
angular.module('mean.execStepsFactory').controller('CreateStepModalController', ['$scope', '$modalInstance',
    'AddStepFactory',

    function($scope, $modalInstance, AddStepFactory) {

        $scope.types =  ['Query', 'Approval', 'Code', 'Upload', 'DateTime'];
        $scope.step = {};
        $scope.step.stepNumber = AddStepFactory.getSteps().length + 1;
        if($scope.step.stepNumber === 1) {
            $scope.step.isFirst = true;
        }

        $scope.addAStep = function(isValid) {
            if (isValid && $scope.step !== undefined) {
                AddStepFactory.setStep($scope.step);
                $modalInstance.close();
            } else {
                $scope.stepFormSbmitted = true;
            }
        };

        $scope.processOnChange = function() {
            $scope.step.values = $scope.unprocessed.values.split(',');
            for(var i = 0; i < $scope.step.values.length; i++ ){
                $scope.step.values[i] = $scope.step.values[i].trim();
            }
        };

        $scope.dismiss = function(){
            $modalInstance.dismiss();
        }
    }
]);