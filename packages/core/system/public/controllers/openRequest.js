(function () {
    'use strict';

    angular
        .module('mean.system')
        .controller('OpenRequest', OpenRequest);

    function OpenRequest($uibModalInstance, Features) {
        /* jshint validthis: true */
        var vm = this;
        vm.close = $uibModalInstance.dismiss;
        vm.submit = submit;
        vm.feedback = {};

        ////////////////

        function submit() {
            var feature = new Features(vm.feedback);
            feature.$save(function(response){
                requestSent(response);
            }, function(err){
                vm.statusText =  err.statusText;
                vm.errorMessage = err.data.message;
            });
        }

        function closeErrorAlert(){
            vm.errorMessage = undefined;
        }


        function requestSent() {
            $uibModalInstance.close(vm.feedback);
        }
    }
})();
