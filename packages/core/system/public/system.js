'use strict';

angular.module('mean.system').run(['$rootScope', '$http', '$window', 'MeanUser', 'Authentication', 'LogMe',
    function($rootScope, $http, $window, MeanUser, Authentication, LogMe) {

        LogMe.checkIn();

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
          var toPath = toState.url;
          toPath = toPath.replace(new RegExp('/', 'g'), '');
          toPath = toPath.replace(new RegExp(':', 'g'),'-');
          toPath = toPath.split(new RegExp('[?#]'))[0];
          $rootScope.state = toPath;
          if($rootScope.state === '' ) {
            $rootScope.state = 'firstPage';
          }
        });

  }]);
