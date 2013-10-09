define(['underscore', 'backbone'], function(_, Backbone) {

  var Track = Backbone.Model.extend({

    defaults: {
      name: '',
      duration: '',
      artist: '',
      album: ''
    },

    initialize: function() {
      console.log('Initializing Track model');
    }

  });

  return Track;
});