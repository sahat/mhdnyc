define([
  'app',
  'underscore',
  'jquery',
  'backbone',
  'text!templates/home.html',
  'text!templates/newPlaylist.html',
  'models/playlist',
  'collections/playlists',
  'views/playlist2'
 ], function(app, _, $, Backbone, homeTpl, newPlaylistTpl, Playlist, PlaylistCollection, PlaylistView) {

  var HomeView = Backbone.View.extend({

    el: '#main',

    template: _.template(homeTpl),

    events: {
      'click #new-playlist-button': 'createNewPlaylist'
    },

    initialize: function() {
      this.listenTo(this.collection, 'add', this.render);

      this.collection.reset([{name: "Andrea's Music"}, {name: "Trance 2013"}]);
    },

    render: function() {
      this.$el.html(this.template({
        collection: this.collection.toJSON()
      }));
      return this;
    },

    createNewPlaylist: function() {
      // Get playlist name
      var $name = $('input#new-playlist').val();
      if (!$name) return;

      // Add new playlist to playlists collection
      var playlist = new Playlist({ name: $name });
      this.collection.add(playlist);

      this.$el.html(_.template(newPlaylistTpl, { name: playlist.get('name') }));
    }

  });

  return HomeView;
});