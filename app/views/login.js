define([
  'underscore',
  'jquery',
  'backbone',
  'text!templates/login.html',
  'async!https://apis.google.com/js/client.js!onload'
], function(_, $, Backbone, loginTpl) {
  var LoginView = Backbone.View.extend({

    template: _.template(loginTpl),

    events: {

    },

    initialize: function() {

      _.bindAll(this, 'render', 'handleAuthResult', 'handleClientLoad', 'handleAuthClick');

      this.clientId = '552955043925.apps.googleusercontent.com';
      this.apiKey = 'AIzaSyCI7tnAyGrkp2K8AiFQLjEWhAFaCiECxjw';
      this.scopes = 'https://www.googleapis.com/auth/plus.me';

      if (localStorage.getItem('me')) {
        this.me = JSON.parse(localStorage.getItem('me'));
      } else {
        this.handleClientLoad();
      }

    },

    render: function() {
      this.$el.html(this.template());
      if (this.me) {
        this.$el.find('#authorize-button').text('Logged in as ' + this.me.displayName);
      }
      return this;
    },

    handleClientLoad: function() {
      // Step 2: Reference the API key
      console.log('Handling Client Load');
      gapi.client.setApiKey(this.apiKey);
      window.setTimeout(_.bind(this.checkAuth, this), 1);
    },

    checkAuth: function() {
      console.log('Checking Auth');
      gapi.auth.authorize({ client_id: this.clientId, scope: this.scopes, immediate: true }, this.handleAuthResult);
    },

    handleAuthResult: function(authResult) {
      console.log('Handling Auth Result');
      var self = this;
      if (authResult && !authResult.error) {
        console.log('Authorized!');
        this.makeApiCall();
      } else {
        this.$el.find('#authorize-button').click(function() {
          self.handleAuthClick();
        });
      }
    },

    handleAuthClick: function(event) {
      console.log('Handling Auth Click');
      // Step 3: get authorization to use private data
      gapi.auth.authorize({client_id: this.clientId, scope: this.scopes, immediate: false}, this.handleAuthResult);
      return false;
    },

    // Load the API and make an API call.  Display the results on the screen.
    makeApiCall: function() {
      console.log('Making API Call');
      // Step 4: Load the Google+ API
      gapi.client.load('plus', 'v1', function() {
        // Step 5: Assemble the API request
        var request = gapi.client.plus.people.get({
          'userId': 'me'
        });
        // Step 6: Execute the API request
        request.execute(function(resp) {
          localStorage.setItem('me', JSON.stringify(resp));
          Backbone.history.navigate('', true);
        });
      });
    }

  });

  return LoginView;
});