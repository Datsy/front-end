var helpers = require('./helpers.js');
var db_helpers = require('./database_helpers.js');
var fs = require('fs');

module.exports = {
  
  route: function(app) {
    app.get('/', this.index);
    app.get('/tags', this.sendTags);
    app.get('/search', this.sendTagMeta);
    app.get('/sample', this.sendSampleColumns);
  },

  index: function(req, res) {
    res.render('index');
  },

  sendTags: function(req, res) {
    var options;
    if (req.query.tag) {
      options = getFilteredTags(req.query)
    } else {
      options = getAllTags();
    }
    sendResponse(res, options, 201);
  },

  sendTagMeta: function(req, res) {
    var tag = req.query['tag'];
    var result = returnDatabaseMetadata(tag);
    sendResponse(res, result, 201);
  },

  sendSampleColumns: function(req, res) {
    var sample = getSampleData(req.query);
    sendResponse(res, sample, 201);
  }

};
