define([
  'underscore',
  'jquery',
  'backbone',
  'views/home'
], function(_, $, Backbone, HomeView) {
  // Defining the application router.
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'login': 'login',
      'new': 'newPlaylist',

      '*actions': 'defaultAction'
    },

    initialize: function() {

    },

    index: function() {
      // Check if user is authentielse {
        var homeView = new HomeView();
        homeView.render();
        console.log('Welcome to your / route');
    },

    login: function() {
      require(['views/login'], function(LoginView) {
        var loginView = new LoginView();
        loginView.render();
        console.log("Welcome to your login route.");
      });
    },

    newPlaylist: function() {
      require(['views/new_playlist'], function(NewPlaylistView) {
        var newPlaylistView = new NewPlaylistView();
        newPlaylistView.render()
        console.log('On new playlist view page');
      });
    },

    defaultAction: function(actions) {
      console.log('No route', actions);
    }
  });

  return AppRouter;
});
