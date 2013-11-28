var path = require('path');

exports.settings = function(app, express){
  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/../views');
    app.set("view engine", "jade");

    app.use(require('stylus').middleware({
      src: __dirname + '/../resources',
      dest: __dirname + '/../public'
    }));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '../public')));
  });
};

