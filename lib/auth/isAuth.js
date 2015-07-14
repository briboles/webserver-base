// Middleware function used to confirm if user is authenticated.

module.exports = function (req, res, next) {
	
	if (req.isAuthenticated()) {
	  return next();
	}

	// Set redirect path to return user to requested page after login.
	req.session.returnTo = (req.route.path || '/');
	res.redirect('/');
}