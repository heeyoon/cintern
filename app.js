var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var csrf = require('csurf');
require('handlebars/runtime');

var routes = require('./routes/index');
var users = require('./routes/users');
var students = require('./routes/students');
var employers = require('./routes/employers');

//Setting up MongoDB
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/cintern');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("database connected");
});

var app = express();
var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(parseForm);
app.use(cookieParser());
app.use(session({ secret : '6170', resave : true, saveUninitialized : true }));
app.use(express.static(path.join(__dirname, 'public')));

// register signup/login stuff before csurf
app.use('/users', users);
app.use(csrfProtection);

app.use('/', routes);
app.use('/students', students);
app.use('/employers', employers);

// Authentication middleware. This function
// is called on _every_ request and populates
// the req.currentUser field with the logged-in
// user object based off the username provided
// in the session variable (accessed by the
// encrypted cookied).
app.use(function(req, res, next) {
  if (req.session.username) {
    User.findOne({username: req.session.username}, function(err, user){
      if (user) {
        req.currentUser = user.username;
      } else {
        req.session.destroy();
      }
      console.log("Current user" + req.currentuser);
      next();
    });
  } else {
      next();
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// csurf middleware
app.post('/process', parseForm, csrfProtection, function(req, res) {
  res.send('data is being processed');
});

module.exports = app;