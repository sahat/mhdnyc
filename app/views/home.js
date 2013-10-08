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
      if (!localStorage.getItem('me')) {
        console.log('First time unathorized user');
        Backbone.history.navigate('#login', true);
      }
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return HomeView;
});