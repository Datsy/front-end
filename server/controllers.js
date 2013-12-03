var helpers = require('./helpers.js');
var db_helpers = require('./database_helpers.js');
var fs = require('fs');
var xml2js = require('xml2js');

module.exports = {
  
  route: function(app) {
    app.get('/', this.index);
    app.get('/tags', this.sendTags);
    app.get('/search', this.sendTagMeta);
    app.get('/sample', this.sendSampleColumns);
    app.get('/column', this.sendColumnData);
    app.post('/png', this.SVGtoPNG);
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
    if (req.query.tag = "ALL") {
      var result = returnAllDatabaseMetadata();
      sendResponse(res, result, 201);      
    } else {
      var tag = 'san francisco';
      // FIX ME AS NEEDED
      var result = returnDatabaseMetadata(tag);
      sendResponse(res, result, 201);
    }
  },

  sendSampleColumns: function(req, res) {
    var sample = getSampleData(req.query);
    sendResponse(res, sample, 201);
  },

  sendColumnData: function(req, res) {
    getColumnData(req.query.id, req.query.name, function(columnData) {
      sendResponse(res, columnData, 201);
    });
  },

  SVGtoPNG: function(req, res) {
    console.log('xml', Object.keys(req.body));
    
    // fs.writeFile('server/svg2png/test.svg', xml, function(err) {
    //   if(err){
    //     console.log('Failed to write SVG file.')
    //   }
    // });

    sendResponse(res, 'fuck yeah son', 200);
  }

};
