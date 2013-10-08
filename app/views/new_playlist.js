define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/new_playlist.html'
], function(_, $, Backbone, newPlaylistTpl) {
  var NewPlaylistView = Backbone.View.extend({

    template: _.template(newPlaylistTpl),

    events: {

    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return NewPlaylistView;
});