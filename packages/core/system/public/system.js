'use strict';

angular.module('mean.system')
    .filter('propsFilter', function() {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        }
    })
    .run(['$rootScope', '$http', '$window', 'MeanUser', 'Authentication', 'LogMe',
    function($rootScope, $http, $window, MeanUser, Authentication, LogMe) {
        LogMe.checkIn();
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            var toPath = toState.url;
            toPath = toPath.replace(new RegExp('/', 'g'), '');
            toPath = toPath.replace(new RegExp(':', 'g'), '-');
            toPath = toPath.split(new RegExp('[?#]'))[0];
            $rootScope.state = toPath;
            if ($rootScope.state === '') {
                $rootScope.state = 'firstPage';
            }
        })

    }]);
