// -------------------------------
//   Express Server Routing
// -------------------------------

var account = require('./account');
var pages = require('./pages');

module.exports = function (app, passport) {
  
  account(app, passport);
  pages(app);

  app.get('/', function(req,res) {
    res.render('index',{title: 'Page Title'});
  });

} 
