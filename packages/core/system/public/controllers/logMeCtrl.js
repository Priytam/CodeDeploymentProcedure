(function () {
    'use strict';
    angular
        .module('mean.system')
        .controller('LogMe', LogMe);

    function LogMe($uibModalInstance, Authentication, $location, $window) {
        /* jshint validthis: true */
        var vm = this;
        vm.close = $uibModalInstance.dismiss;
        vm.user = {};
        vm.logMe = logMe;

        ////////////////

        function logMe() {
            $location.path('/');
            $window.location.reload();
            return iAmLoggedIn();
        }

        function iAmLoggedIn() {
            Authentication.user = vm.user;
            $uibModalInstance.close();
        }
    }
})();
