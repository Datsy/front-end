var helpers = require('./helpers.js');
var db_helpers = require('./database_helpers.js');
var fs = require('fs');

module.exports = {
  
  route: function(app) {
    app.get('/', this.index);
    app.post('/data', this.sendData);
    app.get('/data/:param', this.sendColumn);
  },

  index: function(req, res) {
    res.render('index');
  },

  sendData: function(req, res) {
    processPost(req, function(data) {
      var options = queryOptions(data);
      sendResponse(res, options, 201);
    });
  },

  sendColumn: function(req, res) {
    var columnName = req.params['param'];
    returnColumnData(columnName, function(results) {
      sendResponse(res, results, 201);
    });
  }

};
