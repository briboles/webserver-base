// Logout Current logged in User.

module.exports = function (app) {
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
}
