// Endpoints related to logging in.
module.exports = function (app, passport) {

  app.get('/login', function(req,res) {
    res.render('login', {title: 'Login to Account'});
  });

  app.post('/login', authenticate);
 
  function authenticate (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
      if (err) return next(err); 
      if (!user) {
        // User Login Failed
        return res.status(401).send({ "success": false, "error": 'Authentication Failed.'});
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        var redirectUrl = req.session.returnTo || '/manager';
        return res.status(200).send({ "success": true, "redirectUrl": redirectUrl });
      })
    })(req, res, next);
  }
}
