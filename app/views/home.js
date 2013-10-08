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

    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return HomeView;
});