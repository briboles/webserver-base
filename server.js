// -------------------------------
//    MongoFort WebServer
//  -------------------------------

// Define global path variables
global.root_path = __dirname;
global.lib_path = __dirname + '/lib';

// Require Modules
var express = require('express');
var serverInit = require(lib_path+'/serverInit.js');

// Server Setup
var app = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true; // View engine makes 'pretty' html

serverInit(app);

var port = process.env.NODE_PORT || 8009;

app.listen(port);
console.log('Server running on port ' + port);
