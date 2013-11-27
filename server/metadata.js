var fs = require('fs');

var metadata = {
  dataSetTags: [],
  columnNames: [],
  columnTags: [],
  totalDataSets: 0
};

exports.setUpMetaData = function() {
  // build out dataset tags
  readFakeJSON(function(data) {
    for(var i = 0; i < data.datasets.length; i++) {
      var thisDataSet = data.datasets[i];
      metadata.totalDataSets++;
      // check for duplicates
      metadata.dataSetTags.splice(metadata.dataSetTags.length, 0, thisDataSet.tags);
      for (var j = 0; j < thisDataSet.columns.length; j++) {        
        metadata.columnNames.push(thisDataSet.columns[j].name);
        for (var k = 0; k < thisDataSet.columns[j].columnTags.length; k++) {        
          metadata.columnTags.push(thisDataSet.columns[j].columnTags[k]);
        }
      }
    }
  });
};

exports.getMetaData = function(field) {
  return metadata[field];
};

exports.getColumnNames = function() {
  return metadata.columnNames;
};

exports.getColumn = function(columnName, cb) {
  readFakeJSON(function(data) {
    var results = [];
    for (var i = 0; i < data.datasets.length; i++) {
      for (var j = 0; j < data.datasets[i].columns.length; j++) {
        if (data.datasets[i].columns[j].name === columnName) {
         results =  data.datasets[i].columns[j].data;
         // TODO: break out on finding, deal with mutiples
        }
      }
    }
    cb(results);
  });
};

var readFakeJSON = function(cb) {
  fs.readFile('./server/fakedata/fakejson.json', 'binary', function(err, data) {
    cb(JSON.parse(data));
  });
};
