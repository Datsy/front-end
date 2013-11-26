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
      metadata.dataSetTags.splice(metadata.dataSetTags.length, 0, thisDataSet.tags);
      for (var j = 0; j < thisDataSet.columnNames.length; j++) {        
        metadata.columnNames.push(thisDataSet.columnNames[j].name);
        metadata.columnTags.push(thisDataSet.columnNames[j].columnTags);
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
    //FAKE IT UNTIL WE GET REAL DATA
    var results = [];
    var records = data.datasets[0].records;
    for (var i = 0; i < records.length; i++) {
      results.push(records[i][columnName]);
    }
    cb(results);
  });
};

var readFakeJSON = function(cb) {
  fs.readFile('./server/fakedata/fakejson.json', 'binary', function(err, data) {
    cb(JSON.parse(data));
  });
};
