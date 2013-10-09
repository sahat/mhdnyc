define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/track.html'
], function(_, $, Backbone, tpl) {

  var TrackView = Backbone.View.extend({

    tagName: 'li',

    template: _.template(tpl),

    events: {
			'click .destroy':	'clear'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    clear: function () {
			this.model.destroy();
		}

  });

  return TrackView;
});