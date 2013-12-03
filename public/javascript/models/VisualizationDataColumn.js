(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.VisualizationDataColumn = (function(_super) {
    __extends(VisualizationDataColumn, _super);

    function VisualizationDataColumn() {
      this.setColumnData = __bind(this.setColumnData, this);
      _ref = VisualizationDataColumn.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    VisualizationDataColumn.prototype.initialize = function(options) {
      this.columnName = options.columnName;
      this.datasetID = options.datasetID;
      this.url = '/column?id=' + this.datasetID + '&name=' + this.columnName;
      return this.fetch(url);
    };

    VisualizationDataColumn.prototype.fetch = function(url) {
      var _this = this;
      return $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
          return _this.setColumnData(data);
        }
      });
    };

    VisualizationDataColumn.prototype.setColumnData = function(data) {
      return console.log(data);
    };

    return VisualizationDataColumn;

  })(Backbone.Model);

}).call(this);
