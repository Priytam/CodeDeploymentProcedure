/**
 * Created by arkulkar on 12/21/2015.
 */
angular.module('mean.createRequest').controller('RequestFormController', ['$scope', '$stateParams',
    'ExecStepsFactory', 'Requests',
    function($scope, $stateParams, ExecStepsFactory, Requests){
        if( $stateParams.myPlan === null) {
            ExecStepsFactory.get({
                epId : $stateParams.id
            }, function(plan) {
                $scope.plan = plan;
            });
        } else {
            $scope.plan = $stateParams.myPlan;
        }

        $scope.input = [];
        $scope.requestData = [];

        $scope.pushRequired = function(step, index) {
            var data = {'value' : $scope.requestData[step.name], 'type' : step.type, 'executionNumber' : index , 'name' : $scope.plan.name};
            $scope.input[step.name] = data;
        };

        $scope.submit = function() {
            var request = new Requests($scope.input);
            request.$save(function(response) {
                $scope.reqRes = response;
                //process very first request by default
                request.$process({stepID : response.steps[0].category});
            });
        }
    }
]);