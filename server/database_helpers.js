var fs = require('fs');
var metadata = require('./metadata');

exports.queryOptions = queryOptions = function(data) { 
  var mapColumns = function(columnData) {  
    var options = columnData.filter(function(column) {
      return column.slice(0,data.length) == data;
    });
    return options;
  };
  var columnData = metadata.getColumnNames();
  return mapColumns(columnData);
};

exports.getAllTags = getAllTags = function(data) {
  return metadata.getTags();
};

exports.returnColumnData = returnColumnData = function(columnName, cb) {
  var column = metadata.getColumn(columnName, function(results) {
    cb(results);
  });
};
