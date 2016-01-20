(function () {
    'use strict';
    angular
        .module('mean.system')
        .controller('LogMe', LogMe);

    function LogMe($uibModalInstance, $cookieStore, Authentication, $location, $window) {
        /* jshint validthis: true */
        var vm = this;
        vm.close = $uibModalInstance.dismiss;
        vm.user = {};
        vm.logMe = logMe;

        ////////////////

        function logMe() {
            Authentication.user = vm.user;
            $cookieStore.put('user',  vm.user);
            return iAmLoggedIn();
        }

        function iAmLoggedIn() {
            $location.path('/');
            $window.location.reload();
            $uibModalInstance.close(true);
            $uibModalInstance.close(true);
        }
    }
})();
