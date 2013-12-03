var helpers = require('./helpers.js');
var db_helpers = require('./database_helpers.js');
var fs = require('fs');
var jsonxml = require('jsontoxml');

module.exports = {
  
  route: function(app) {
    app.get('/', this.index);
    app.get('/tags', this.sendTags);
    app.get('/search', this.sendTagMeta);
    app.get('/sample', this.sendSampleColumns);
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
    var tag = 'san francisco';
    // FIX ME AS NEEDED
    var result = returnDatabaseMetadata(tag);
    sendResponse(res, result, 201);
  },

  sendSampleColumns: function(req, res) {
    var sample = getSampleData(req.query);
    sendResponse(res, sample, 201);
  },

  SVGtoPNG: function(req, res) {
    // console.log('req', Object.keys(req));
    var xml = jsonxml(req.body);
    
    console.log('xml: ', xml);
    
    fs.writeFile('server/svg2png/test.svg', xml, function(err) {
      if(err){
        console.log('Failed to write SVG file.')
      }
    });

    sendResponse(res, 'fuck yeah son', 200);
  }

};
