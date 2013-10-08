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
      this.$main = $('#main');
    },

    index: function() {
      // Check if user is authenticated
      if (!localStorage.isAuthenticated) {
        Backbone.history.navigate('#login', true);
      } else {
        var homeView = new HomeView();
        console.log(homeView.render().el);
        this.$main.html(homeView.render().el);
        console.log("Welcome to your / route.");
      }
    },

    login: function() {
      require(['views/login'], function(LoginView) {
        var loginView = new LoginView();
        this.$main.html(loginView.render().el);
        console.log("Welcome to your login route.");
      });
    },

    newPlaylist: function() {
      require(['views/new_playlist'], function(NewPlaylistView) {
        var newPlaylistView = new NewPlaylistView();
        this.$main.html(newPlaylistView.render().el);
        console.log('On new playlist view page');
      });
    },

    defaultAction: function(actions) {
      console.log('No route', actions);
    }
  });

  return AppRouter;
});
