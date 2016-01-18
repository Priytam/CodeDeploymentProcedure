(function () {
    'use strict';

    angular
        .module('mean.system')
        .controller('ReportIssue', ReportIssue);

    function ReportIssue($uibModalInstance) {
        /* jshint validthis: true */
        var vm = this;

        vm.feedback = {};
        vm.close = $uibModalInstance.dismiss;
        vm.submit = submit;

        ////////////////

        function submit() {

        }

        function issueOpened() {
            logger.success('Successfully opened a new issue');
            $uibModalInstance.close(vm.feedback);
        }
    }
})();
