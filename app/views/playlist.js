define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/playlist.html',
  'collections/playlist',
  'views/track'
], function(_, $, Backbone, playlistTpl, Playlist, TrackView) {

  var PlaylistView = Backbone.View.extend({

    el: '#main',

    template: _.template(playlistTpl),

    events: {

    },

    initialize: function() {
      this.render();

      var playlist = new Playlist();
      this.listenTo(playlist, 'add', this.addOne);
      this.listenTo(playlist, 'reset', this.addAll);
      //this.listenTo(playlist, 'all', this.render);

      playlist.fetch();

      //playlist.create({ name: 'Track Three', artist: 'Artist3', duration: '2:33' });
    },

    render: function() {
      console.log('rendering')
      this.$el.html(this.template());
      return this;
    },

    addOne: function (track) {
      console.log('adding one');
			var view = new TrackView({ model: track });
			$('#tracks').append(view.render().el);
		},

		addAll: function () {
      console.log('adding all');
			this.$('#tracks').html('');
			playlist.each(this.addOne, this);
		}

  });

  return PlaylistView;
});