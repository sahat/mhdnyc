define([
  'app',
  'underscore',
  'jquery',
  'backbone',
  'text!templates/home.html',
  'models/playlist',
  'collections/playlists',
  'views/playlist2'
 ], function(app, _, $, Backbone, homeTpl, Playlist, PlaylistCollection, PlaylistView) {

  var HomeView = Backbone.View.extend({

    el: '#main',

    template: _.template(homeTpl),

    events: {
      'click #new-playlist-button': 'createNewPlaylist'
    },

    initialize: function() {
      this.listenTo(this.collection, 'add', this.render);

      this.collection.reset([{name: "Asia"}, {name: "Africa"}]);
    },

    render: function() {
      this.$el.html(this.template({
        collection: this.collection.toJSON()
      }));
      return this;
    },

    createNewPlaylist: function() {
      var $name = $('#new-playlist-name').val();
      if (!$name) return;

      var playlist = new Playlist({ name: $name });

      app.playlistCollection.add(playlist);

      //Backbone.history.navigate('#new', true);
    }

  });

  return HomeView;
});