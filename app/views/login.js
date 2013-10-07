define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/login.html'
], function(_, $, Backbone, loginTpl) {
  var LoginView = Backbone.View.extend({

    el: '#main',

    template: _.template(loginTpl),

    events: {

    },

    initialize: function() {
      function signinCallback(authResult) {
        if (authResult['access_token']) {
          // Update the app to reflect a signed in user
          // Hide the sign-in button now that the user is authorized, for example:
          document.getElementById('signinButton').setAttribute('style', 'display: none');
        } else if (authResult['error']) {
          // Update the app to reflect a signed out user
          // Possible error values:
          //   "user_signed_out" - User is signed-out
          //   "access_denied" - User denied access to your app
          //   "immediate_failed" - Could not automatically log in the user
          console.log('Sign-in state: ' + authResult['error']);
        }
      }
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return LoginView;
});