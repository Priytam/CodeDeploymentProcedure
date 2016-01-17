(function () {
    'use strict';
    angular
        .module('mean.system')
        .controller('LogMe', LogMe);

    function LogMe($modalInstance, $cookieStore, Authentication, $location, $window) {
        /* jshint validthis: true */
        var vm = this;
        vm.close = $modalInstance.dismiss;
        vm.user = '';
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
            $modalInstance.close(true);
            $modalInstance.close(true);
        }
    }
})();
