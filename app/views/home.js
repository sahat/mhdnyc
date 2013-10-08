define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/home.html'
], function(_, $, Backbone, homeTpl) {
  var HomeView = Backbone.View.extend({
    el: '#main',

    template: _.template(homeTpl),

    events: {
      'click #new-playlist': 'createNewPlaylist'
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    createNewPlaylist: function() {
      console.log('clicky');
    }
  });

  return HomeView;
});