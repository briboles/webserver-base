// -- serverInit.js --
// Express Sever Setup / Configuration

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser =  require('cookie-parser');
var MongoStore = require('connect-mongo')(session);

// Auth config and routing
var passport = require(global.lib_path+'/auth/config');
var routes = require(global.lib_path+'/routes');

// Connect to mongoDB database 
var mongoose = require('mongoose');
mongoose.connect('mongodb://@127.0.0.1:27017/');

// Configure sessions to be stored in mongodb
var sessionOptions = {
  secret: "S3cR3tS@uC3",
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
};

module.exports = function (app) {
  
  // Request / Static File Middleware
  app.use(bodyParser.urlencoded({ extended: false })); 
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static(global.root_path + '/public'));

  // Session / Auth Middleware
  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());

  // Initialize Routes
  routes(app, passport);
  
  // Handle any unhandled requests with a 404 message.
  app.use(function(req, res, next){
    res.status(404).render('404', {title: "Page not found"});
  });

};
