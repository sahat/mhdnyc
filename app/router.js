define([
  'underscore',
  'jquery',
  'backbone',
  'views/home'
], function(_, $, Backbone, HomeView) {
  // Defining the application router.
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'login': 'login',

      '*actions': 'defaultAction'
    },

    index: function() {
      // Check if user is authenticated
      if (!localStorage.isAuthenticated) {
        Backbone.history.navigate('#login', true);
      } else {
        var homeView = new HomeView();
        $('#main').html(homeView.render().el);
        console.log("Welcome to your / route.");
      }
    },

    login: function() {
      require(['views/login'], function(LoginView) {
        var loginView = new LoginView();
        $('#main').append(loginView.render().el);
        console.log("Welcome to your login route.");
      });
    },

    defaultAction: function(actions) {
      console.log('No route', actions);
    }
  });

  return AppRouter;
});
