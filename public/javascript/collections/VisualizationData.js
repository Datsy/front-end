(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.VisualizationData = (function(_super) {
    __extends(VisualizationData, _super);

    function VisualizationData() {
      this.tagLoaded = __bind(this.tagLoaded, this);
      _ref = VisualizationData.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    VisualizationData.prototype.initialize = function(options) {
      this.allColumns = {};
      this.columnsForY = [];
      this.columnsForX = [];
      this.totalLoaded = 0;
      this.total = 0;
      return this;
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
          _this.total++;
          if (name === 'date') {
            newX = new DatsyApp.VisualizationDataColumn({
              columnName: 'date',
              datasetID: id
            });
            _this.columnsForX.push(newX);
            return newX.on('loaded', _this.tagLoaded);
          } else {
            newY = new DatsyApp.VisualizationDataColumn({
              columnName: name,
              datasetID: id
            });
            _this.columnsForY.push(newY);
            return newY.on('loaded', _this.tagLoaded);
          }
        }));
      }
      return _results;
    };

    VisualizationData.prototype.tagLoaded = function() {
      this.totalLoaded++;
      if (this.totalLoaded === this.total) {
        this.trigger('loaded');
      }
      return this;
    };

    return VisualizationData;

  })(Backbone.Collection);

}).call(this);
