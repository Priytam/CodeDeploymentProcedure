(function () {
    'use strict';

    angular
        .module('mean.system')
        .controller('SwitchUser', SwitchUser);

    function SwitchUser($modalInstance, $location, $window, Authentication, $cookieStore) {
        /* jshint validthis: true */
        var vm = this;
        vm.close = $modalInstance.dismiss;
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
            $modalInstance.close(true);
        }
    }
})();
