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
      var allColumns,
        _this = this;
      allColumns = {};
      options.columns.forEach(function(column) {
        allColumns[column.datasetID] = allColumns[column.datasetID] || [];
        allColumns[column.datasetID].push(column.columnName);
        if (allColumns[column.datasetID].indexOf('date') === -1) {
          return allColumns[column.datasetID].push('date');
        }
      });
      console.log(allColumns);
      return this.columnsForY = [];
    };

    return VisualizationData;

  })(Backbone.Collection);

}).call(this);
