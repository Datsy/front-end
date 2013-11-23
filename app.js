//////////////////////////////////////////
///
/// DATSY.io
///
//////////////////////////////////////////

// Instantiate server
var express = require('express'),
    sass = require('node-sass'),
    http = require('http'),
    path = require('path');
 
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set("view engine", "jade");
  app.use(sass.middleware({
     src:   __dirname + '/public',
     dest:  __dirname + '/public',
     debug: true
  }));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


var controllers = require('./server/controllers');
//var middleware = require('./server/middleware');

// set middleware
//middleware.settings(app, express);

controllers.route(app);
 
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
