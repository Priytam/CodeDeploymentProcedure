/**
 * Created by arkulkar on 12/21/2015.
 */
angular.module('mean.execStepsFactory').controller('CreateStepModalController', ['$scope', '$uibModalInstance',
    'AddStepFactory', 'DbFactory',
    function($scope, $uibModalInstance, AddStepFactory, DbFactory) {

        $scope.types =  ['Query', 'Approval', 'Code', 'Upload', 'DateTime'];
        $scope.step = {};
        $scope.unProcessed = {};
        $scope.step.stepNumber = AddStepFactory.getSteps().length + 1;
        if($scope.step.stepNumber === 1) {
            $scope.step.isFirst = true;
            $scope.step.isNext = true;
            $scope.step.status = 'WAITING';
        }

        $scope.addAStep = function(isValid) {
            if (isValid && $scope.step !== undefined) {
                AddStepFactory.setStep($scope.step);
                $uibModalInstance.close();
            } else {
                $scope.stepFormSbmitted = true;
            }
        };
        
        $scope.processOnChange = function() {
            $scope.step.values = [];
            var values = $scope.unProcessed.values.split(',');
            for(var i = 0; i < values.length; i++ ){
                $scope.step.values[i] = values[i].trim();
            }
        };

        $scope.disabled = false;

        $scope.enable = function() {
            $scope.disabled = false;
        };

        $scope.disable = function() {
            $scope.disabled = true;
        };

        $scope.clear = function() {
            $scope.step.values = undefined;
        };

        $scope.onSelected = function(selectedItem){

            $scope.step.values =  JSON.stringify(selectedItem);
        };

        $scope.getAvailableDataBase = function() {
            DbFactory.query(function(dataBases){
                $scope.dbs = dataBases;
            });
        };

        $scope.dismiss = function(){
            $uibModalInstance.dismiss();
        }
    }
]);