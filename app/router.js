define([
  'underscore',
  'jquery',
  'backbone'
], function(_, $, Backbone) {
  // Defining the application router.
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'login': 'login',
      'new': 'newPlaylist',
      'playlist': 'playlist',
      '*actions': 'defaultAction'
    },

    initialize: function() {

    },

    index: function() {
      if (localStorage.getItem('me')) {
        require(['views/home'], function(HomeView) {
          var homeView = new HomeView();
          homeView.render();
          console.log('Welcome to your / route');
        });
      } else {
        console.log('First time unathorized user');
        Backbone.history.navigate('#login', true);
      }
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
        console.log('On new playlist view page');
      });
    },

    playlist: function() {
      require(['views/playlist'], function(Playlist) {
        var playlist = new Playlist();
      });
    },

    defaultAction: function(actions) {
      console.log('No route', actions);
    }
  });

  return AppRouter;
});
