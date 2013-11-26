var helpers = require('./helpers.js');
var db_helpers = require('./database_helpers.js');
var fs = require('fs');

module.exports = {
  
  route: function(app) {
    app.get('/', this.index);
    app.post('/data', this.sendData);
  },

  index: function(req, res) {
    res.render('index');
  },

  sendData: function(req, res) {
    processPost(req, function(data) {
      var options = queryOptions(data);
      sendResponse(res, options, 201);
    });
  }

};

    // var data = [
    //   {letter: 'A', frequency: .08167 },
    //   {letter: 'B', frequency: .01492 },
    //   {letter: 'C', frequency: .02782 },
    //   {letter: 'D', frequency: .04253 },
    //   {letter: 'E', frequency: .12702 },  
    //   {letter: 'F', frequency: .02288 },
    //   {letter: 'G', frequency: .02015 },
    //   {letter: 'H', frequency: .06094 },
    //   {letter: 'I', frequency: .06966 },
    //   {letter: 'J', frequency: .00153 },
    //   {letter: 'K', frequency: .00772 },
    //   {letter: 'L', frequency: .04025 },
    //   {letter: 'M', frequency: .02406 },
    //   {letter: 'N', frequency: .06749 },
    //   {letter: 'O', frequency: .07507 },
    //   {letter: 'P', frequency: .01929 },
    //   {letter: 'Q', frequency: .00095 },
    //   {letter: 'R', frequency: .05987 },
    //   {letter: 'S', frequency: .06327 },
    //   {letter: 'T', frequency: .09056 },
    //   {letter: 'U', frequency: .02758 },
    //   {letter: 'V', frequency: .00978 },
    //   {letter: 'W', frequency: .02360 },
    //   {letter: 'X', frequency: .00150 },
    //   {letter: 'Y', frequency: .01974 },
    //   {letter: 'Z', frequency: .00074 },
    // ];