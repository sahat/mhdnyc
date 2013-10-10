define([
  'underscore',
  'jquery',
  'backbone',
  'collections/playlists'
], function(_, $, Backbone, PlaylistCollection) {
  // Defining the application router.
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'login': 'login',
      'new': 'createNewPlaylist',
      'playlist': 'playlist',
      '*actions': 'defaultAction'
    },

    initialize: function() {
      this.playlists = new PlaylistCollection();
    },

    index: function() {
      var self = this;

      if (localStorage.getItem('me')) {
        require(['views/home'], function(HomeView) {
          var homeView = new HomeView({ collection: self.playlists });
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

    createNewPlaylist: function() {
      var self = this;
      require(['views/newPlaylist'], function(NewPlaylistView) {
        console.log(self.playlists.last())
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
