/**
 * Created by arkulkar on 12/21/2015.
 */
angular.module('mean.createRequest').controller('RequestsDetailController', ['$scope', '$stateParams', 'Requests', 'RequestsSpecific', '$state',
    function($scope, $stateParams, Requests, RequestsSpecific, $state){
        $scope.showFinished = false;
        $scope.searchInput = '';

        if( $stateParams.request === null) {
            Requests.get({
                reqID : $stateParams.id
            }, function(request) {
                $scope.request = request;
                findSpecific();
            });
        } else {
            $scope.request = $stateParams.request;
            findSpecific()
        }



        function findSpecific() {
            var specific =  new RequestsSpecific({steps : $scope.request.steps});
            specific.$collect(function(response) {
                $scope.steps = response.steps;
                selectActiveStep();
            });
        }

        function selectActiveStep(){
            var isFinished = true;
            angular.forEach($scope.steps, function(value, key){
                if(value.status === 'INPROGRESS'){
                    isFinished = false;
                    $state.go('home.requestDetail.stepView', {step : value, id : $scope.request._id, stepId : value._id, type : value.type});
                }
            });
            if(isFinished){
                $scope.showFinished = true;
            }
        }
    }
]);