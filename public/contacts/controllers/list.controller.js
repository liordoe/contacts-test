(function() {
  'use strict';

  angular
    .module('contacts')
    .controller('ListController', ListCtrl)

  ListCtrl.$inject = ['$scope', '$log', '$state', '$timeout', 'PagerService'];

  function ListCtrl($scope, $log, $state, $timeout, PagerService) {
    $scope.contacts = [];
    $scope.pager = {};
    $scope.filter = '';

    function setPage(page) {
      if (page < 0 || page > $scope.pager.totalPages) {
        return;
      }

      $scope.pager = PagerService.GetPager($scope.contacts.length, page);
      $scope.items = $scope.contacts.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }
    $scope.setPage = setPage;

    $timeout(function() {
      getList();
    }, 1000);

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
      if (elem.attr('id'))
        $state.go('contacts.edit', {
          item: $scope.contacts[elem.attr('id')]
        });
    }
    $scope.getClick = getClick;

    function getType(obj) {
      var f = Object.prototype.toString;
      return f.call(obj).slice(8, -1);
    }

    function filterEntries(obj) {
      for (var key in obj) {
        if (getType(obj[key]) === 'Array' || getType(obj[key]) === 'Object') {
          return filterEntries(obj[key]);
        } else if (key.indexOf('$$') === -1 && getType(obj[key]) === 'String' && obj[key].indexOf($scope.filter) !== -1) {
          return true;
        }
      }
      return false;
    }

    function getList() {
      var local = JSON.parse(localStorage.getItem('contacts'));
      if (local) {
        $scope.contacts = local;
      } else {
        var out = [];
        for (var i = 0; i < 100; i++) {
          out.push({
            id: i,
            firstName: 'Name' + (i + 1),
            lastName: 'Sur' + (i + 1),
            emails: (function() {
              var limit = Math.floor(Math.random() * (3 - 1 + 1)) + 1,
                out = [];
              for (let i = 0; i < limit; i++) {
                out.push({
                  type: i % 2 === 0 ? 'Work' : 'Home',
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
                  type: i % 2 === 0 ? 'Work' : 'Home',
                  value: i % 2 === 0 ? '+0200000000' : '+9100000000'
                });
              }
              return out;
            })()
          });
        }
        $scope.contacts = out;
        localStorage.setItem('contacts', JSON.stringify($scope.contacts));
      }
      $scope.contacts = $scope.contacts.filter(filterEntries);
      setPage(0);
    }
    $scope.getList = getList;
  }

}());