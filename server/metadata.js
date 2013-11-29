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

exports.getMetaData = function(tag) {
  var results = metadata.dataSets.filter(function(dataset) {
    return (dataset.tags.indexOf(tag) === -1) ? false : true;
  })
  return results;
};

exports.getTags = function() {
  return metadata.dataSetTags;
};

var readFakeJSON = function(cb1, cb2) {
  
  fs.readFile('./server/fakedata/tags.json', 'binary', function(err, data) {
     cb1(JSON.parse(data));
  });

  fs.readFile('./server/fakedata/datasets-meta.json', 'binary', function(err, data) {
    cb2(JSON.parse(data));
  });
};
