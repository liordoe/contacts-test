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
  angular.element(document).ready(function() {
    angular.bootstrap(document, [app.applicationModuleName]);
  });

}(ApplicationConfiguration));