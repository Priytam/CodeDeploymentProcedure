(function () {
    'use strict';

    angular
        .module('mean.system')
        .controller('OpenRequest', OpenRequest);

    function OpenRequest($modalInstance) {
        /* jshint validthis: true */
        var vm = this;
        vm.close = $modalInstance.dismiss;
        vm.submit = submit;

        ////////////////

        function submit() {

        }

        function requestSent() {
            $modalInstance.close(vm.feedback);
        }
    }
})();
