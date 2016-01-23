'use strict';

angular.module('mean.chat')
    .controller('ChatController', ['$scope', '$state', 'Global', 'Socket', 'Authentication',
        function($scope, $state, Global, Socket, Authentication) {
            $scope.global = Global;
            $scope.package = {
                name: 'socket'
            };

            $scope.userName = Authentication.user.username;
            $scope.messages = [];

            Socket.on('message:received', function messageReceived(message) {
                $scope.messages.push(message);
            });

            Socket.emit('user:joined', {
                name : $scope.userName
            });

            Socket.on('user:joined', function(user) {
                $scope.messages.push(user);
            });

            Socket.on('messages', function(messages) {
                $scope.messages = messages;
            });

            Socket.on(' message:received', function(messages) {
                $scope.messages.push(messages);
            });
            $scope.sendMessage = function(message) {
                if (!message || message === null || typeof message === 'undefined' || message.length === 0) {
                    return;
                }
                Socket.emit('message:send', {
                    message: message,
                    user: Authentication.user.username
                });
                $scope.message = {};
            };
        }
    ]);
