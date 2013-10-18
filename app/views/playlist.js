define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/playlist.html',
  'views/track'
], function(_, $, Backbone, playlistTpl, TrackView) {

  var PlaylistView = Backbone.View.extend({

    el: '#main',

    template: _.template(playlistTpl),

    events: {
      'click .location': 'play'
    },

    initialize: function() {
      this.render();

      //var playlist = new Playlist();
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);

//      playlist.fetch();

      //playlist.create({ name: 'Track Three', artist: 'Artist3', duration: '2:33' });
    },

    render: function() {
      console.log('Rendering playlist view');
      this.$el.html(this.template({
        collection: this.collection.get('tracks').toJSON()
      }));
      return this;
    },

    addOne: function (track) {
      console.log('adding one');
			var view = new TrackView({ model: track });
			$('#playlists').append(view.render().el);
		},

		addAll: function () {
      console.log('adding all');
			this.$('#playlists').html('');
			this.collection.each(this.addOne, this);
		},

    play: function() {
      console.log('Please play');
    }

  });

  return PlaylistView;
});