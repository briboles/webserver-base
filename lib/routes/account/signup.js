// All endpoints related to signing up.

var valNewUser = require(global.lib_path+'/auth/validation');
var User = require(global.lib_path+'/dbmodels/user');

module.exports = function (app, passport) {

  app.get('/signup', function(req,res) {
    res.render('signup', { 
    	title: 'Account Setup',
    	preaccout: req.session.preaccount || false,
    	email: req.session.email
    });
  });

  app.post('/fastsignup', fastsignup);

  app.post('/signup', signup);


  // Full Account Signup
	function signup (req, res, next) {
	  passport.authenticate('signup', function (err, user, info) {
			if (err) return next({error: [err.message]}); 
			if (!user) {
				// User Creation Failed
				return res.status(400).send(info);
			}
      req.logIn(user, function(err) {
        if (err) return next(err);
        var redirectUrl = req.session.returnTo || '/manager';
        return res.status(200).send({ "success": true, "redirectUrl": redirectUrl });
      })
		})(req, res, next);
	}


  // Take an Email Address and create a basic account.
  function fastsignup (req, res) {
    var userCheck = {'email' : req.body.email};

    var userData = {
      email: req.body.email,
      preaccount: true
    };

    valNewUser(userData, function (err, userData) {
      if (err) {
        return res.status(400).send(err);
      }
      else {
        // Confirm a username doesn't already exist
        User.findOne(userCheck, function(err, user) {
          if (err) return console.log(err);
          if (user) {
            return res.status(400).send({ error: ['Email already in use.'] });
          }
          else {
            var newUser = new User(userData);
            newUser.save(function (err, newUser) {
              if (err) throw err; 
              else{ 
                req.session.preaccount = true;
                req.session.email = userData.email;
                return res.status(200).send({ "success": true, "redirectUrl": '/signup' });
              } 
            });
          }
        });
      }
    });
  }
}

