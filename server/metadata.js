var fs = require('fs');

var metadata = {
  dataSetTags: [],
  totalDataSets: 0,
  dataSets: []
};

exports.setUpMetaData = function() {
  // build out dataset tags
  readFakeJSON(function(data) {
    data.tags.forEach(function(datum) {
      metadata.dataSetTags.push(datum);
    });
  },
  function(data) {
    data.datasets.forEach(function(dataset) {
      metadata.totalDataSets++;
      metadata.dataSets.push(dataset);
    });
  });
};

exports.getMetaData = function(field) {
  return metadata.datasets;
};

exports.getTags = function() {
  return metadata.dataSetTags;
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

var readFakeJSON = function(cb1, cb2) {
  
  fs.readFile('./server/fakedata/tags.json', 'binary', function(err, data) {
     cb1(JSON.parse(data));
  });

  fs.readFile('./server/fakedata/datasets-meta.json', 'binary', function(err, data) {
    cb2(JSON.parse(data));
  });
};
