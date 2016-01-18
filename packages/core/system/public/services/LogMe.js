(function () {
    'use strict';

    angular
        .module('mean.system')
        .factory('LogMe', logMe);

    function logMe(Authentication, $uibModal, MeanUser, $cookieStore) {

        Authentication.user = $cookieStore.get('user');

        function checkIn() {
            if(Authentication.user === undefined || Authentication.user === "") {
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

        function loginNow(){
            MeanUser.logUser(Authentication.user)
                .success( function(err , user){

                });
        }

        function askAgainToOpen(){
            checkIn();
        }

        var service = {
            checkIn: checkIn
        };

        return service;

    }
})();
