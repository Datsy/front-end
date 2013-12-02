var fs = require('fs');
var metadata = require('./metadata');

exports.getAllTags = getAllTags = function(data) {
  return metadata.getTags();
};

exports.returnDatabaseMetadata = returnDatabaseMetadata = function(tag) {
  return metadata.getMetaData(tag);
};

exports.getSampleData = getSampleData = function(queryObj) {
  return metadata.getSampleData(queryObj.id, queryObj.column);
};
