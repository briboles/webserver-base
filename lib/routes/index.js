// -------------------------------
//   Express Server Routing
// -------------------------------

var account = require('./account');
var manager = require('./manager');

module.exports = function (app, passport) {
  
  account(app, passport);
  manager(app);

  app.get('/', function(req,res) {
    res.render('index',{title: 'MongoFort'});
  });

} 
