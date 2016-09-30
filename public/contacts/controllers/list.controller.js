(function() {
  'use strict';

  angular
    .module('contacts')
    .controller('ListController', ListCtrl)

  ListCtrl.$inject = ['$scope', '$log', '$state', '$timeout'];

  function ListCtrl($scope, $log, $state, $timeout) {
    $scope.contacts = [];

    $timeout(function() {
      getList();
    }, 4000);

    function getClick(e) {
      var i = 0,
        elem = angular.element(e.target);
      while (elem.length > 0) {
        if (elem[0].tagName !== 'TR') {
          i++;
          elem = elem.parent();
        } else {
          $log.info(elem.attr('id'), i);
          break;
        }

      }
    }
    $scope.getClick = getClick;

    function getList() {
      var out = [];
      for (var i = 0; i < 100; i++) {
        out.push({
          id: i+1,
          name: 'Name' + (i+1),
          emails: (function() {
            var limit = Math.floor(Math.random() * (3 - 1 + 1)) + 1,
              out = [];
            for (let i = 0; i < limit; i++) {
              out.push({
                type: i % 2 === 0 ? 'work' : 'personal',
                value: 'testemail@email.com'
              });
            }
            return out;
          })(),
          phones: (function() {
            var limit = Math.floor(Math.random() * (3 - 1 + 1)) + 1,
              out = [];
            for (let i = 0; i < limit; i++) {
              out.push({
                type: i % 2 === 0 ? 'work' : 'personal',
                value: '000000000'
              });
            }
            return out;
          })()
        });
      }
      $scope.contacts = out.slice(0, 10);
    }
  }

}());