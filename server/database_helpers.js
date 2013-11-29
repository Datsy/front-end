var fs = require('fs');
var metadata = require('./metadata');

exports.getAllTags = getAllTags = function(data) {
  return metadata.getTags();
};

exports.returnDatabaseMetadata = returnDatabaseMetadata = function(tag, cb) {
  return metadata.getMetaData(tag);
};
