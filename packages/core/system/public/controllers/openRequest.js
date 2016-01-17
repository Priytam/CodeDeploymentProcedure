(function () {
    'use strict';

    angular
        .module('mean.system')
        .controller('OpenRequest', OpenRequest);

    function OpenRequest($uibModalInstance) {
        /* jshint validthis: true */
        var vm = this;
        vm.close = $uibModalInstance.dismiss;
        vm.submit = submit;

        ////////////////

        function submit() {

        }

        function requestSent() {
            $uibModalInstance.close(vm.feedback);
        }
    }
})();
