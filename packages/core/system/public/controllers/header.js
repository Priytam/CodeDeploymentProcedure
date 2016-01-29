'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Menus', 'MeanUser', '$state', '$uibModal',
    'Authentication', 'toaster', 'Socket', 'UserRequests', 'LogMe',
  function($scope, $rootScope, Menus, MeanUser, $state, $uibModal, Authentication, toaster, Socket, UserRequests, LogMe) {

      var vm = this;

      vm.menus = {};
      vm.hdrvars = {
          authenticated: MeanUser,
          user: MeanUser.user,
          isAdmin: MeanUser.isAdmin
      };
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


      $scope.$on('toast_error', function (event, response) {
          toaster.pop(
              'error',
              response.statusText,
              response.data.message
          );
      });

      $scope.isCollapsed = false;

      UserRequests.query({
          user: $scope.user ? $scope.user.username : ''
      }, function (requests) {
          $scope.inProgressRequests = requests;
      });

      $scope.switchUser = function () {
          $uibModal.open({
              templateUrl: 'system/views/switchUser.html',
              backdrop: 'static',
              controller: 'SwitchUser as vm'
          }).result.then(LogMe.loginNow);
      };
/*
      function loginNow() {
          MeanUser.logUser(Authentication.user).then(function (response) {
                  Authentication.user = response.data.user;
                  $cookieStore.put('user',  response.data.user);
              });
      }*/

      $scope.reportAnIssue = function () {
          $uibModal.open({
              templateUrl: 'system/views/reportIssue.html',
              backdrop: 'static',
              controller: 'ReportIssue as vm'
          });
      };

      $scope.submitRequest = function () {
          $uibModal.open({
              templateUrl: 'system/views/openRequest.html',
              backdrop: 'static',
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
