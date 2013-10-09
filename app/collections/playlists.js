define([
  'underscore',
  'jquery',
  'backbone',
  'models/playlist'
], function(_, $, Backbone, Playlist) {
  var Playlists = Backbone.Collection.extend({
    model: Playlist,

    isFirstTrack: function(index) {
      return index == 0;
    },

    isLastTrack: function(index) {
      return index >= this.get('tracks').length - 1
    },
    
    trackUrlAtIndex: function(index) {
      if (this.get('tracks').length >= index) {
        return this.get('tracks')[index];
      }
      return null;
    }
  });

  return Playlists;
});