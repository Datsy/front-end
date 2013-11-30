var path = require('path');
var sass = require('node-sass');

exports.settings = function(app, express){
  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/../views/release');
    app.set("view engine", "ejs");
    app.use(sass.middleware({
       src:   __dirname + '/../public',
       dest:  __dirname + '/../public',
       debug: true
    }));
    app.use(express.favicon());
    //app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '../public')));
  });
};

