(function() {
    'use strict';

    angular
        .module('mean.system')
        .controller('About', About);

    function About($modalInstance) {
        /* jshint validthis: true */
        var vm = this;

        vm.close = $modalInstance.dismiss;
        vm.releaseNotesLink = '';
        vm.appName = 'Code Deployment Procedure';
        vm.version = '1.0.0';
        vm.buildDate = '12/feb/1026';
    }
})();
