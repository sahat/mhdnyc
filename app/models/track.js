define(['underscore', 'jquery', 'backbone'], function(_, $, Backbone) {
  var Track = Backbone.Model.extend({
    defaults: {
      name: "Harry Potter"
    }
  });

  return Track;
});