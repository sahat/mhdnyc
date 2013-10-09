define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/home.html'
 ], function(_, $, Backbone, homeTpl, PlaylistView) {
  var HomeView = Backbone.View.extend({
    el: '#main',

    template: _.template(homeTpl),

    events: {
      'click #new-playlist-button': 'createNewPlaylist'
    },

    initialize: function() {

    },

    render: function() {
      this.$el.html(this.template());
      this.addAllPlaylists();
      return this;
    },

    addAllPlaylists: function() {
      //this.collection.each(this.addOnePlaylist, this);
    },

    addOnePlaylist: function(model) {
      var playlist = new PlaylistView({model: model});
      this.$el.append(playlist.render().el);
    },

    createNewPlaylist: function() {
      console.log($('#new-playlist-name').val());
      Backbone.history.navigate('#new', true);
    }
  });

  return HomeView;
});