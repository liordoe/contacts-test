(function(app) {
  'use strict';

  app.registerModule('contacts', ['core']);
  app.registerModule('contacts.routes', ['ui.router', 'core.routes']);

}(ApplicationConfiguration));