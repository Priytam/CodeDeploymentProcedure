'use strict';

angular.module('mean.dbFactory').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('home.dbFactory', {
            url: '/dbFactory',
            parent: 'home',
            templateUrl: 'dbFactory/views/createDataBase.html'
        });
    }
]);