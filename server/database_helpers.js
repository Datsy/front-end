var fs = require('fs');
var metadata = require('./metadata');

exports.getAllTags = getAllTags = function() {
  return metadata.getTags();
};

exports.getFilteredTags = getFilteredTags = function(query) {
  return metadata.getFilteredTags(query);
};

exports.getColumnData = getColumnData = function(databaseID, columnName, cb) {
  metadata.getColumnData(databaseID, columnName, cb);
};

exports.returnDatabaseMetadata = returnDatabaseMetadata = function(tag) {
  return metadata.getMetaData(tag);
};

exports.getSampleData = getSampleData = function(queryObj) {
  return metadata.getSampleData(queryObj.id, queryObj.column);
};

exports.returnAllDatabaseMetadata = returnAllDatabaseMetadata = function() {
  return metadata.getAllMetaData();
}
