'use strict';

angular.module('mean-factory-interceptor', [])
    .factory('httpInterceptor', function ($q, $rootScope, PageValues) {
        var numLoadings = 0;
        return {
            request: function (config) {
                numLoadings++;
                PageValues.loading = true;
                //$rootScope.$broadcast("loader_show");
                return config || $q.when(config)
            },
            response: function (response) {
                if ((--numLoadings) === 0) {
                    PageValues.loading = false;
                    //$rootScope.$broadcast("loader_hide");
                }
                return response || $q.when(response);
            },
            responseError: function (response) {
                if (!(--numLoadings)) {
                    PageValues.loading = false;
                   // $rootScope.$broadcast("loader_hide");
                }
                $rootScope.$broadcast('toast_error',response);
                return $q.reject(response);
            }
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    });
    /*.directive("loader", function () {
        return function ($scope, element) {
            $scope.$on("loader_show", function () {
                return element.show();
            });
            return $scope.$on("loader_hide", function () {
                return element.hide();
            });
        };
    });*/