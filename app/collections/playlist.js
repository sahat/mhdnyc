define([
  'underscore',
  'jquery',
  'backbone',
  'models/track'
], function(_, $, Backbone, Track) {
  var Playlist = Backbone.Collection.extend({
    model: Track
  });

  return Playlist;
});