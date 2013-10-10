define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/home.html',
  'views/playlist',
  'collections/playlist'
 ], function(_, $, Backbone, homeTpl, PlaylistView, Playlist) {
  var HomeView = Backbone.View.extend({
    el: '#main',

    template: _.template(homeTpl),

    events: {
      'click #new-playlist-button': 'createNewPlaylist'
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    createNewPlaylist: function() {
      console.log($('#new-playlist-name').val());
      var playlist = Playlist();
      var playlistView = new PlaylistView({
        collection: playlist
      });
      //Backbone.history.navigate('#new', true);
    }
  });

  return HomeView;
});