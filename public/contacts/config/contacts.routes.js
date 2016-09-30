(function() {
  'use strict';

  angular
    .module('contacts.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/contacts', '/list');
    $stateProvider
      .state('contacts', {
        url: '/contacts',
        template: '<ui-view/>',
      })
      .state('contacts.list', {
        url: '^/list',
        templateUrl: 'public/contacts/views/list.html',
        controller: 'ListController',
        data: {
          pageTitle: 'List'
        }
      })
      .state('contacts.edit', {
        url: '^/edit',
        params: {
          item: null
        },
        templateUrl: 'public/contacts/views/item.html',
        controller: 'EditController',
        data: {
          pageTitle: 'Edit'
        }
      })
      .state('contacts.new', {
        url: '^/new',
        templateUrl: 'public/contacts/views/item.html',
        controller: 'NewController',
        data: {
          pageTitle: 'New'
        }
      });;
  }
}());