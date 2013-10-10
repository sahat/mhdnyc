define([
  'app',
  'string',
  'underscore',
  'jquery',
  'backbone',
  'text!templates/home.html',
  'text!templates/newPlaylist.html',
  'models/track',
  'models/playlist',
  'collections/playlists',
  'collections/tracks'
 ], function(app, S, _, $, Backbone, homeTpl, newPlaylistTpl,
             Track, Playlist, PlaylistCollection,
             TrackCollection) {

  var HomeView = Backbone.View.extend({

    el: '#main',

    template: _.template(homeTpl),

    events: {
      'click .location': 'playlist',
      'click #new-playlist-button': 'createNewPlaylist',
      'click #parse': 'parseTracks'
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

    playlist: function(e) {
      var name = $(e.target)
        .clone()
        .children()
        .remove()
        .end()
        .text();
      name = S(name).slugify();
      Backbone.history.navigate('#playlist/' + name);
    }
    ,
    createNewPlaylist: function() {
      // Get playlist name
      this.$name = $('input#new-playlist').val();
      if (!this.$name) return;

//      // Add new playlist to playlists collection
//      var playlist = new Playlist({ name: $name });
//      this.collection.add(playlist);

      this.$el.html(_.template(newPlaylistTpl, { name: this.$name }));
    },

    parseTracks: function() {
      var $text = $('textarea').val();
      var splitted = $text.split('\t');
      var withoutEmpty = _.without(splitted, '');

      var trackCollection = new TrackCollection();

      for (var i=0; i<withoutEmpty.length; i+=4) {
        var trackArray = withoutEmpty.slice(i, i+4);

        // Make sure array is not undefined or empty
        if (trackArray.length) {
          var track = new Track({
            name: trackArray[0],
            duration: trackArray[1],
            artist: trackArray[2],
            album: trackArray[3]
          });

          trackCollection.add(track);
        }
      }

      var playlist = new Playlist({ name: this.$name, tracks: trackCollection });
      this.collection.add(playlist);
    }

  });

  return HomeView;
});