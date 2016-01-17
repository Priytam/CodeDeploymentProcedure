(function() {
    'use strict';

    angular
        .module('mean.system')
        .controller('About', About);

    function About($uibModalInstance) {
        /* jshint validthis: true */
        var vm = this;

        vm.close = $uibModalInstance.dismiss;
        vm.releaseNotesLink = '';
        vm.appName = 'Code Deployment Procedure';
        vm.version = '1.0.0';
        vm.buildDate = '12/feb/1026';
    }
})();
