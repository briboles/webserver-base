// All endpoints related to signing up or logging in.
var User = require(global.lib_path+'/dbmodels/user');

module.exports = function (app, passport) {

  app.get('/forgot', function(req, res) {
    res.render('forgot', { title: 'Password Retrieval' });
  });

}