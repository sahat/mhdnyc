define(['underscore', 'backbone', 'localstorage', 'models/playlist'], function(_, Backbone, Store, Playlist) {

  var PlaylistCollection = Backbone.Collection.extend({

    model: Playlist,

    localStorage: new Store('playlists'),

    initialize: function() {
      console.log('Creating a playlists collection');
    }

  });

  return PlaylistCollection;
});