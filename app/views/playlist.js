define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/playlist.html',
  'collections/playlist',
  'views/track'
], function(_, $, Backbone, playlistTpl, Playlist, TrackView) {

  var PlaylistView = Backbone.View.extend({

    template: _.template(playlistTpl),

    events: {
      // add click handlers
    },

    initialize: function() {
      var playlist = new Playlist();

      this.listenTo(playlist, 'add', this.addOne);
      this.listenTo(playlist, 'reset', this.addAll);

      playlist.fetch();

      //playlist.create({ name: 'Track One ', trackCount: 5 });
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    addOne: function (track) {
      console.log('adding one');
			var view = new TrackView({ model: track });
			$('#main').append(view.render().el);
		},

		addAll: function () {
      console.log('adding all');
			this.$('#tracks').html('');
			playlist.each(this.addOne, this);
		}

  });

  return PlaylistView;
});

