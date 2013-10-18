var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    path = require('path'),
    request = require('request'),
    MongoStore = require('connect-mongo')(express);

var app = express();

mongoose.connect('localhost', function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

var UserSchema = mongoose.model('User', new mongoose.Schema({
  googleId: { type: String, index: { unique: true } },
  accessToken: String,
  displayName: String,
  link: String,
  gender: String,
  email: String
}));

var User = mongoose.model('User', UserSchema);

// Express Configuration
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/login', function(req, res) {
  User.findOne({ 'googleId': profile.id }, function(err, existingUser) {
    if(existingUser) {
      done(null, existingUser);
    } else {
      var user = new User({
        googleId: profile.id,
        accessToken: accessToken,
        displayName: profile.displayName,
        link: profile._json.link,
        picture: profile._json.picture,
        gender: profile._json.gender,
        email: profile._json.email,
        locale: profile._json.locale,
        verified: profile._json.verified_email,
        isAdmin: userCount < 1
      });
      user.save(function(err) {
        if (err) throw err;
        done(null, user);
      });
    }
  });
});

// Starts the express application
app.listen(3000, 'localhost', function() {
  console.log('Express server started listening');
});


process.on('uncaughtException', function(err) {
  console.error(err);
});
