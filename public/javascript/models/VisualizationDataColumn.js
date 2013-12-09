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
      var columnToSend;
      this.columnName = options.columnName;
      columnToSend = this.columnName;
      if (columnToSend.split(' ').length > 1) {
        columnToSend = columnToSend.split(' ').join('+');
      }
      this.datasetName = options.datasetName;
      this.url = 'http://datsy-dev.azurewebsites.net/search/table?name=' + this.datasetName + '&row=ALL&column=' + columnToSend;
      return this.fetch(this.url);
    };

    VisualizationDataColumn.prototype.fetch = function(url) {
      var _this = this;
      console.log(url);
      return $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
          return _this.setColumnData(data);
        },
        error: function(res, err, error) {
          return console.log(error.message);
        }
      });
    };

    VisualizationDataColumn.prototype.setColumnData = function(data) {
      var _this = this;
      this.columnData = {
        dataset: this.datasetName,
        name: this.columnName
      };
      this.columnData['data'] = data.Result.row.map(function(rowObj) {
        return rowObj[_this.columnName];
      });
      return this.trigger('loaded');
    };

    VisualizationDataColumn.prototype.getColumnData = function() {
      return this.columnData.data;
    };

    return VisualizationDataColumn;

  })(Backbone.Model);

}).call(this);
