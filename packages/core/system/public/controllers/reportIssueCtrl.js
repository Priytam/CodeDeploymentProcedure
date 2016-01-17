(function () {
    'use strict';

    angular
        .module('mean.system')
        .controller('ReportIssue', ReportIssue);

    function ReportIssue($modalInstance) {
        /* jshint validthis: true */
        var vm = this;

        vm.feedback = {};
        vm.close = $modalInstance.dismiss;
        vm.submit = submit;

        ////////////////

        function submit() {

        }

        function issueOpened() {
            logger.success('Successfully opened a new issue');
            $modalInstance.close(vm.feedback);
        }
    }
})();
