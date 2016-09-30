(function() {
  'use strict';

  angular
    .module('contacts')
    .controller('ListController', ListCtrl)

  ListCtrl.$inject = ['$scope', '$log', '$state', '$timeout', 'PagerService', 'ListService'];

  function ListCtrl($scope, $log, $state, $timeout, PagerService, ListService) {
    $scope.contacts = [];
    $scope.pager = {};
    $scope.filter = '';

    function setPage(page) {
      var filteredData = $scope.filter ? $scope.contacts.filter(filterEntries) : $scope.contacts;
      $scope.pager = PagerService.GetPager(filteredData.length, page);
      if (page < 1 || page > $scope.pager.totalPages) {
        $scope.items = [];
        return;
      }

      $scope.items = filteredData.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }
    $scope.setPage = setPage;

    function getClick(e) {
      var i = 0,
        elem = angular.element(e.target);
      while (elem.length > 0) {
        if (elem[0].tagName !== 'TR') {
          i++;
          elem = elem.parent();
        } else {
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
      var value = false;
      for (var key in obj) {
        if (getType(obj[key]) === 'Array' || getType(obj[key]) === 'Object') {
          value = value || filterEntries(obj[key]);
        } else if (key.indexOf('$$') === -1 && key !== 'id' && String(obj[key]).toLowerCase().indexOf($scope.filter) !== -1)
          return true;
      }
      return value || false;
    }

    function getList() {
      var local = JSON.parse(localStorage.getItem('contacts'));
      if (local) {
        $scope.contacts = local;
        setPage(1);
      } else {
        ListService.getList().then(function(response) {
          $scope.contacts = response.data;
          localStorage.setItem('contacts', JSON.stringify($scope.contacts));
          setPage(1);
        }, function(status, err) {
          $log.error(status, err);
        });
      }
    }
    $scope.getList = getList;
  }

}());