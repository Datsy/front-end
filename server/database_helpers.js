var fs = require('fs');
var columnData;

exports.queryOptions = queryOptions = function(data) {
  
  var mapColumns = function(columnData) {  
    var options = columnData.filter(function(column) {
      return column.slice(0,data.length) == data;
    });
    return options;
  };

  if (!columnData) {
    fakeJSON(function(data) {
      columnData = data.columns;
      return mapColumns(columnData);
    });
  } else {
    return mapColumns(columnData);
  }
};

exports.returnColumnData = returnColumnData = function(columnName, cb) {
  fakeJSON(function(data) {
    var results = data.records.map(function(record) {
      return record[columnName];
    });
    cb(results);
  });
};
