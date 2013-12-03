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
      allColumns = options.columns;
      this.columnsForY = [];
      return allColumns.forEach(function(column) {
        var newY;
        newY = new DatsyApp.VisualizationDataColumn({
          columnName: column.columnName,
          datasetID: column.datasetID
        });
        return _this.columnsForY.push(newY);
      });
    };

    return VisualizationData;

  })(Backbone.Collection);

}).call(this);
