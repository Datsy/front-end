var path = require('path');
var sass = require('node-sass');

exports.settings = function(app, express){
  app.use(app.router);
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/../views');
  app.set("view engine", "jade");
  app.configure(function() {
    app.use(
      sass.middleware({
        src: __dirname + '/styles', //where the sass files are 
        dest: __dirname + '/public/stylesheets', //where css should go
        debug: true // obvious
      })
    );
  });
  app.use(express.static(path.join(__dirname, '/../public')));
};

