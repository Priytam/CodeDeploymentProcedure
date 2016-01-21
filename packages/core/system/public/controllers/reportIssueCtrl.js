(function () {
    'use strict';

    angular
        .module('mean.system')
        .controller('ReportIssue', ReportIssue);

    function ReportIssue($uibModalInstance, Bugs) {
        /* jshint validthis: true */
        var vm = this;

        vm.feedback = {};
        vm.close = $uibModalInstance.dismiss;
        vm.submit = submit;
        vm.closeErrorAlert = closeErrorAlert;

        ////////////////

        function submit() {
            var bug = new Bugs(vm.feedback);
            bug.$save(function(response){
                issueOpened(response);
            }, function(err){
                vm.statusText =  err.statusText;
                vm.errorMessage = err.data.message;
            });
        }

        function closeErrorAlert(){
            vm.errorMessage = undefined;
        }

        function issueOpened(response) {
            $uibModalInstance.close(response);
        }
    }
})();
