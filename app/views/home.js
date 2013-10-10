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
      app.playlistCollection = new PlaylistCollection(); // move into routeer and then call as this.collection
      //this.listenTo(app.playlistCollection, 'add', this.render);


      app.playlistCollection.reset([{name: "Asia"}, {name: "Africa"}]);
    },

    render: function() {
      this.$el.html(this.template({
        collection: app.playlistCollection.toJSON()
      }));
      return this;
    },

    createNewPlaylist: function() {
      var $name = $('#new-playlist-name').val();
      var playlist = new Playlist({ name: $name });

      app.playlistCollection.add(playlist);

      var view = new PlaylistView({ model: playlist });
			$('#main').append(view.render().el);

      //Backbone.history.navigate('#new', true);
    }

  });

  return HomeView;
});