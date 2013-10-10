define(['underscore', 'backbone', 'collections/tracks'], function(_, Backbone, TrackCollection) {

  var Playlist = Backbone.Model.extend({

    defaults: function() {
      // returning a function here for deep-copy defaults
      return {
        name: '',
        tracks: new TrackCollection()
      }
    },

    initialize: function() {
      console.log('Creating a playlist model');
    }

  });

  return Playlist;
});