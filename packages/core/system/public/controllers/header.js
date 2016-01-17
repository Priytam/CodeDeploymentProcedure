'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Menus', 'MeanUser', '$state', '$uibModal',
    'Authentication',
  function($scope, $rootScope, Menus, MeanUser, $state, $uibModal, Authentication) {
    
    var vm = this;

    vm.menus = {};
    vm.hdrvars = {
        authenticated: MeanUser.loggedin,
        user: MeanUser.user,
        isAdmin: MeanUser.isAdmin
    }
      $scope.user = Authentication.user;

    // Default hard coded menu items for main menu
    var defaultMainMenu = [];

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu(name, defaultMenu) {

        Menus.query({
            name: name,
            defaultMenu: defaultMenu
        }, function (menu) {
            vm.menus[name] = menu;
        });
    }

    // Query server for menus and check permissions
    queryMenu('main', defaultMainMenu);
    queryMenu('account', []);


    $scope.isCollapsed = false;

    $rootScope.$on('loggedin', function() {
      queryMenu('main', defaultMainMenu);

      vm.hdrvars = {
        authenticated: MeanUser.loggedin,
        user: MeanUser.user,
        isAdmin: MeanUser.isAdmin
      };
    });

    vm.logout = function(){
      MeanUser.logout();
    };

    $rootScope.$on('logout', function() {
      vm.hdrvars = {
        authenticated: false,
        user: {},
        isAdmin: false
      };
      queryMenu('main', defaultMainMenu);
      $state.go('home');
    });

      $scope.switchUser = function () {
          $uibModal.open({
              templateUrl: 'system/views/switchUser.html',
              backdrop : 'static',
              controller: 'SwitchUser as vm'
          }).result.then(loginNow);
      };

      function loginNow(){
          MeanUser.logUser(Authentication.user)
              .success( function(err , user){

              });
      }

      $scope.reportAnIssue = function () {
          $uibModal.open({
              templateUrl: 'system/views/reportIssue.html',
              backdrop : 'static',
              controller: 'ReportIssue as vm'
          });
      };

      $scope.submitRequest = function () {
          $uibModal.open({
              templateUrl: 'system/views/openRequest.html',
              backdrop : 'static',
              controller: 'OpenRequest as vm',
              draggable: true
          });
      };

      $scope.about = function () {
          $uibModal.open({
              templateUrl: 'system/views/about.html',
              backdrop: 'static',
              controller: 'About as vm',
              draggable: true
          });
      }
  }
]);
