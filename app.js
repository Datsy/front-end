//////////////////////////////////////////
///
/// DATSY.io
///
//////////////////////////////////////////

// Instantiate server
var express = require('express'),
    http = require('http'),
    path = require('path');
 
exports.app = app = express();

var controllers = require('./server/controllers');
var middleware = require('./server/middleware');
var metadata = require('./server/metadata');

// set middleware
middleware.settings(app, express);

controllers.route(app);
metadata.setUpMetaData();
 
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
