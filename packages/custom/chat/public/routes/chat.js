'use strict';

angular.module('mean.chat').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('home.chats', {
      url: '/chat',
      templateUrl: 'chat/views/chat.html'
    });
  }
]);
