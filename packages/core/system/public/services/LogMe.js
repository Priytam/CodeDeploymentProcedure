(function () {
    'use strict';

    angular
        .module('mean.system')
        .factory('LogMe', logMe);

    function logMe(Authentication, $uibModal, MeanUser, $cookieStore) {

        Authentication.user = $cookieStore.get('user');

        function checkIn() {
            if(angular.equals({}, Authentication.user) || Authentication.user === undefined || Authentication.user === "") {
                $uibModal.open({
                    templateUrl: 'system/views/logMe.html',
                    backdrop : 'static',
                    controller: 'LogMe as vm'
                }).result.then(loginNow, askAgainToOpen)
            }
            else {
                loginNow();
            }
        }

        function loginNow() {
            var user = Authentication.user;
            MeanUser.logUser(user).then(function successCallback(response) {
                Authentication.user = response.data.user;
                if(Authentication.user.roles.indexOf('admin') !== -1){
                    Authentication.user.isAdmin = true;
                } else {
                    Authentication.user.isAdmin = false;
                }
                $cookieStore.put('user', response.data.user);
            }, function errorCallback(err) {
                checkIn();
            });
        }

        function askAgainToOpen(){
            checkIn();
        }

        var service = {
            checkIn: checkIn,
            loginNow : loginNow
        };

        return service;

    }
})();
