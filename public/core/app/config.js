(function (window) {
  'use strict';

  var applicationModuleName = 'softesis';

  var service = {
    applicationModuleName: applicationModuleName,
    applicationDependencies: ['ui.router'],
    registerModule: registerModule
  };

  window.ApplicationConfiguration = service;

  function registerModule(moduleName, dependencies) {
    angular.module(moduleName, dependencies || []);
    angular.module(applicationModuleName).requires.push(moduleName);
  }
}(window));
