(function(app) {
  'use strict';

  angular
    .module(app.applicationModuleName, app.applicationDependencies)
    .config(bootstrapConfig)

  function bootstrapConfig($compileProvider, $locationProvider) {
    // $locationProvider.html5Mode(true).hashPrefix('!');
    $compileProvider.debugInfoEnabled(true);
  }
  bootstrapConfig.$inject = ['$compileProvider', '$locationProvider'];

  angular.element(document).ready(init);

  function init() {
    if (window.location.hash.substring(0, 2) !== '#/') {
      window.location.hash = '#/';
      if (!window.location.pathname) window.location.pathname = '/';
    }
    angular.bootstrap(document, [app.applicationModuleName]);
  }

}(ApplicationConfiguration));