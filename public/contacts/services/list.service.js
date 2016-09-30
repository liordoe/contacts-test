(function() {
  'use strict';

  angular
    .module('contacts')
    .service('ListService', ListService)

  ListService.$inject = ['$http'];

  function ListService($http) {

    this.getList = getList;

    function getList() {
      return $http.get('/list');
    }
  }

}());