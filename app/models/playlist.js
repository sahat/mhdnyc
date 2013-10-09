define([
  '../.',
  'jquery',
  'backbone',
  'models/track'
], function(_, $, Backbone, Track) {
  var Playlist = Backbone.Model.extend({
    model: Track,

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

  return Playlist;
});