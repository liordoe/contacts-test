(function(){
    'use strict';

    angular
        .module('core')
        .controller('DashboardController', DashboardCtrl)

    DashboardCtrl.$inject = ['$scope', '$state', '$log'];
    function DashboardCtrl($scope, $state, $log){
        $log.info('state', $state);
    }

}());