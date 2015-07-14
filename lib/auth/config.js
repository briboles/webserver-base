// Setup / Configure Passport Module to Control Auth 

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Database Model
var User = require(global.lib_path+'/dbmodels/user');
var valNewUser = require(global.lib_path+'/auth/validation');

// User serialization - required for persistent sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user) {
    done(err, user);
  });
}); 

// Setup Sign Up Strategy
passport.use(
	'signup', 
	 new LocalStrategy({passReqToCallback: true},
	 function (req, username, password, done) {

	 	var userCheck = {
			$or: [
	  		{'username' : username},
	  		{'email' : req.body.email}
			]
		};

		var userData = {
      username: req.body.username,
     	email: req.body.email,
     	password: req.body.password,
      name: req.body.name
    };

    valNewUser(userData, function (err, userData) {
      if (err) {
        return done(err, false);
      }
      else {
        // Confirm a username doesn't already exist
        User.findOne(userCheck, function(err, user) {
          if (err) return done(err);
          if (user) {
          	return done(null, false, { "error": 'Username or Email already in use.' });
          }
          else {
        		var newUser = new User(userData);
         		newUser.password = newUser.generateHash(userData.password);
            newUser.save(function (err, newUser) {
        		  if (err) throw err;
        		  else{ 
          		  return done(null, newUser);
          	  }
        		});
        	}
        });
      }
    });
	}));

// Setup Login Strategy
passport.use(
  'login', 
  new LocalStrategy({passReqToCallback: true},
	function (req, username, password, done) {
 
    // Confirm a username doesn't already exist
    User.findOne({'username': username}, function(err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, {"error": 'Username not found.'});
      }
      if (!user.validPassword(password)) {
        return done(null, false, { "error": 'Username and Password do not match.' });
      }
      return done(null,user);
    });
  }
));

module.exports = passport;