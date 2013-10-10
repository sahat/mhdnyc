define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/playlist.html'
], function(_, $, Backbone, tpl) {

  var PlaylistView = Backbone.View.extend({

    template: _.template(tpl),

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  return PlaylistView;
});