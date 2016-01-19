/**
 * Created by arkulkar on 12/21/2015.
 */
angular.module('mean.createRequest').controller('RequestFormController', ['$scope', '$stateParams',
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
                var date = new Date();
                $scope.destination = '/docs_'+$scope.plan.name+'_'+date.getFullYear()+'_'+date.getMonth() + 1 +'_'+date.getDay()+'_'+'_'+date.getHours()+'_'+date.getMinutes()+'_'+date.getSeconds()+'/';
                createDefaultSteps()
            });
        } else {
            $scope.plan = $stateParams.myPlan;
            var date = new Date();
            $scope.destination = '/docs_'+$scope.plan.name+'_'+date.getFullYear()+'_'+date.getMonth()+ 1 +'_'+date.getDay()+'_'+ '_'+date.getHours()+'_'+date.getMinutes()+'_'+date.getSeconds()+'/';
            createDefaultSteps()
        }

        function createDefaultSteps(){
            $scope.request.name = $scope.plan.name;
            angular.forEach($scope.plan.steps, function(step) {
                var data = {'values' : [], 'type' : step.type,  'executionNumber': step.stepNumber, 'isFirst' : step.isFirst , 'isLast' : step.isLast, 'name' : $scope.plan.name};
                if(step.type === 'Query') {
                    data.connectionString = step.values[0];
                }
                $scope.request.steps[step.name]= data;
            }, $scope.request.steps);
        }

        $scope.pushRequired = function(step) {
            $scope.request.steps[step.name].values.push($scope.requestData[step.name]);
        };

        $scope.submit = function() {
            var newRequest = new Requests($scope.request);
            newRequest.$save(function(response) {
                $state.go('home.requestDetail', {request : response, id : response._id});
            });
        };

        $scope.uploadFileCallback = function(file) {
                $scope.files.push(file);
        };

        $scope.uploadFinished = function(files, step, index) {
            var data = {'value' : files, 'type' : step.type, 'executionNumber': step.stepNumber, 'isFirst' : step.isFirst , 'isLast' : step.isLast , 'name' : $scope.plan.name};
            $scope.request.input[step.name] = data;
        }
    }
]);