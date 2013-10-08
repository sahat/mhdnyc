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
      // Step 1: Configuration Keys
      clientId = '552955043925.apps.googleusercontent.com';
      apiKey = 'AIzaSyCI7tnAyGrkp2K8AiFQLjEWhAFaCiECxjw';
      scopes = 'https://www.googleapis.com/auth/plus.me';

      this.handleClientLoad();

      _.bindAll(this, 'handleClientLoad', 'checkAuth', 'handleAuthResult', 'handleAuthClick', 'makeApiCall');
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    handleClientLoad: function() {
      // Step 2: Reference the API key
      console.log('Handling Client Load');
      gapi.client.setApiKey(apiKey);
      window.setTimeout(this.checkAuth, 1);
    },

    checkAuth: function() {
      console.log('Checking Auth');
      console.log(this.handleAuthResult)
      gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, this.handleAuthResult);
    },

    handleAuthResult: function(authResult) {
      console.log('Handling Auth Result');

      var authorizeButton = this.$el.find('#authorize-button');

      if (authResult && !authResult.error) {
        console.log('Authorized!');
        this.makeApiCall();
      } else {
        authorizeButton.onclick = this.handleAuthClick;
      }
    },

    handleAuthClick: function(event) {
      console.log('Handling Auth Click');
      // Step 3: get authorization to use private data
      gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, this.handleAuthResult);
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
          var authorizeButton = this.$el.find('#authorize-button');

          if (authorizeButton) {
            authorizeButton.innerText = 'Logged in as ' + resp.displayName;
          }

          localStorage.isAuthenticated = true;
          Backbone.history.navigate('', true);
        });
      });
    }

  });

  return LoginView;
});