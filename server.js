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
app.set('port', process.env.PORT || 8000);
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
        gender: profile._json.gender,
        email: profile._json.email,
      });
      user.save(function(err) {
        if (err) throw err;
        done(null, user);
      });
    }
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

process.on('uncaughtException', function(err) {
  console.error(err);
});
