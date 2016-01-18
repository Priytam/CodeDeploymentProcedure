(function () {
    'use strict';

    angular
        .module('mean.system')
        .controller('SwitchUser', SwitchUser);

    function SwitchUser($uibModalInstance, $location, $window, Authentication, $cookieStore) {
        /* jshint validthis: true */
        var vm = this;
        vm.close = $uibModalInstance.dismiss;
        vm.newUser = '';
        vm.loggedUser = Authentication.user;
        vm.switchUser = switchUser;
        vm.clearUser = clearUser;
        vm.isEmulatedUser = true;

        ////////////////

        function switchUser() {
            Authentication.user = vm.newUser;
            $cookieStore.put('user',  vm.newUser);
            return userSwitched();
        }

        function clearUser() {
            return userSwitched();
        }

        function userSwitched() {
            $location.path('/');
            $window.location.reload();
            $uibModalInstance.close(true);
        }
    }
})();
