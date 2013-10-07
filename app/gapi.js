define(['jquery', 'backbone', 'async!https://apis.google.com/js/client.js!onload'], function($, Backbone) {
  console.log('gapi loaded');

  var clientId = '552955043925.apps.googleusercontent.com';
  var apiKey = 'AIzaSyCI7tnAyGrkp2K8AiFQLjEWhAFaCiECxjw';
  var scopes = 'https://www.googleapis.com/auth/plus.me';

  function handleClientLoad() {
    // Step 2: Reference the API key
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
  }

  function checkAuth() {
    gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, handleAuthResult);
  }

  function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {

      makeApiCall();
    } else {
      authorizeButton.onclick = handleAuthClick;
    }
  }

  function handleAuthClick(event) {
    // Step 3: get authorization to use private data
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
  }

  // Load the API and make an API call.  Display the results on the screen.
  function makeApiCall() {
    // Step 4: Load the Google+ API
    gapi.client.load('plus', 'v1', function() {
      // Step 5: Assemble the API request
      var request = gapi.client.plus.people.get({
        'userId': 'me'
      });
      // Step 6: Execute the API request
      request.execute(function(resp) {
        var authorizeButton = document.getElementById('authorize-button');

        if (authorizeButton) {
          authorizeButton.innerText = 'Logged in as ' + resp.displayName;
        }

        localStorage.isAuthenticated = true;
        Backbone.history.navigate('', true);
      });
    });
  }

  handleClientLoad();
});