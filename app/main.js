require.config({
  paths: {
    'vendor': '../vendor',
    'almond': '../vendor/bower/almond/almond',
    'text': '../vendor/bower/requirejs-text/text',
    'async': '../vendor/bower/requirejs-plugins/src/async',
    'underscore': '../vendor/bower/lodash/dist/lodash.underscore',
    'jquery': '../vendor/bower/jquery/jquery',
    'backbone': '../vendor/bower/backbone/backbone',
    'localstorage': '../vendor/bower/backbone.localStorage/backbone.localStorage'
  },

  shim: {
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});

require(['app', 'router'], function(app, Router) {
  app.router = new Router();
  Backbone.history.start();
});