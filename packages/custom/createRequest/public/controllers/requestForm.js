/**
 * Created by arkulkar on 12/21/2015.
 */
angular.module('mean.createRequest')
    .controller('RequestFormController', ['$scope', '$stateParams',
    'ExecStepsFactory', 'Requests', '$state',
    function($scope, $stateParams, ExecStepsFactory, Requests, $state){

        $scope.requestData = [];
        $scope.files = [];
        $scope.request = {};
        $scope.request.reason = '';
        $scope.request.issueNumber = '';
        $scope.request.steps = {};

        if( $stateParams.myPlan === null) {
            ExecStepsFactory.get({epId : $stateParams.id}, function(plan) {
                $scope.plan = plan;
                createDefaultSteps()
            });
        } else {
            $scope.plan = $stateParams.myPlan;
            createDefaultSteps()
        }

        function createDefaultSteps(){
            $scope.request.name = $scope.plan.name;
            angular.forEach($scope.plan.steps, function(step) {
                var data = {'values' : [], 'type' : step.type,  'executionNumber': step.stepNumber, 'isFirst' : step.isFirst , 'isLast' : step.isLast, isNext : step.isNext, 'name' : $scope.plan.name};
                if(step.type === 'Query') {
                    data.connectionString = step.values[0];
                }
                if(step.type === 'Approval') {
                    data.values = step.values;
                }
                $scope.request.steps[step.name]= data;
            }, $scope.request.steps);
        }

        $scope.submit = function() {
            var newRequest = new Requests($scope.request);
            newRequest.$save(function(response) {
                $state.go('home.requestDetail', {request : response, id : response._id});
            });
        };
    }
]);