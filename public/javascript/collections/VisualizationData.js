(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.VisualizationData = (function(_super) {
    __extends(VisualizationData, _super);

    function VisualizationData() {
      _ref = VisualizationData.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    VisualizationData.prototype.initialize = function(options) {
      this.allColumns = {};
      this.buildColumnRequest(options.columns);
      this.columnsForY = [];
      this.columnsForX = [];
      return this.makeRequests();
    };

    VisualizationData.prototype.buildColumnRequest = function(columns) {
      var _this = this;
      return columns.forEach(function(column) {
        _this.allColumns[column.datasetID] = _this.allColumns[column.datasetID] || [];
        _this.allColumns[column.datasetID].push(column.columnName);
        if (_this.allColumns[column.datasetID].indexOf('date') === -1) {
          return _this.allColumns[column.datasetID].push('date');
        }
      });
    };

    VisualizationData.prototype.makeRequests = function() {
      var columnArray, id, _ref1, _results,
        _this = this;
      _ref1 = this.allColumns;
      _results = [];
      for (id in _ref1) {
        columnArray = _ref1[id];
        _results.push(columnArray.forEach(function(name) {
          var newX, newY;
          if (name === 'date') {
            newX = new DatsyApp.VisualizationDataColumn({
              columnName: 'date',
              datasetID: id
            });
            return _this.columnsForX.push(newX);
          } else {
            newY = new DatsyApp.VisualizationDataColumn({
              columnName: name,
              datasetID: id
            });
            return _this.columnsForY.push(newY);
          }
        }));
      }
      return _results;
    };

    return VisualizationData;

  })(Backbone.Collection);

}).call(this);
