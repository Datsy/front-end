var db_helpers = require('./database_helpers.js');

var metadata = {};

exports.setUpMetaData = function() {
  // build out dataset tags
  readFakeJSON(function(data) {
    for(var prop in data.datasets) {

    }
  });
  // build out ???
  readFakeJSON(function(data) {

  });
};

var readFakeJSON = function(cb) {
  fs.readFile('./server/fakedata/fakejson.json', 'binary', function(err, data) {
    cb(JSON.parse(data));
  });
};