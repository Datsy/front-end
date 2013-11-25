var helpers = require('./helpers.js');

module.exports = {
  
  route: function(app) {
    app.get('/', this.index);
    app.get('/data', this.sendData);
  },

  index: function(app, res) {
    res.render('index');
  },

  sendData: function(app, res) {
    var data = [
      {data: 4},
      {data: 8},
      {data: 15},
      {data: 16},
      {data: 23},
      {data: 42}
    ];

    sendResponse(res, data, 201);
  }

};
 