define(['underscore', 'backbone', 'localstorage', 'models/track'], function(_, Backbone, Store, Track) {

  var TrackCollection = Backbone.Collection.extend({

    model: Track,

    localStorage: new Store('mhdnyc'),

    initialize: function() {
      console.log('Creating a tracks collection');
    }

  });

  return TrackCollection;
});