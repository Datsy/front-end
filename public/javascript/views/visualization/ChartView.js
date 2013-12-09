(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.ChartView = (function(_super) {
    __extends(ChartView, _super);

    function ChartView() {
      _ref = ChartView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ChartView.prototype.events = {};

    ChartView.prototype.tagName = "svg";

    ChartView.prototype.initialize = function(options) {
      this.currentXModel = null;
      this.currentYModel = null;
      this.chartWidth = $(".container").width();
      this.chartHeight = this.chartWidth / 2;
      this.rawData = {};
      this.convertData(options);
      this.margin = {
        top: 20,
        right: 140,
        bottom: 30,
        left: 20
      };
      this.padding = 50;
      this.width = this.chartWidth - this.margin.left - this.margin.right;
      this.height = this.chartHeight - this.margin.top - this.margin.bottom;
      return this.graphs = new DatsyApp.Charts();
    };

    ChartView.prototype.render = function() {
      var chartType;
      d3.select(this.el).selectAll("*").remove();
      chartType = this.model.get("chartType");
      if (chartType === "lineChart") {
        this.graphs.renderLineChart(this.data);
      } else if (chartType === "lineChart2Y") {
        this.graphs.renderLineChart2Y(this.data);
      } else if (chartType === "stackedArea") {
        this.graphs.renderStackedAreaChart(this.data);
      } else if (chartType === "stackedMultiBar") {
        this.graphs.renderStackedMultiBar(this.data);
      } else {
        if (chartType === "scatterBubble") {
          this.graphs.renderScatterBubbleGraph(this.data);
        }
      }
      return this.$el;
    };

    ChartView.prototype.renderChart = function() {
      return this.trigger("renderChart", {
        chartView: true,
        x: this.currentXModel,
        y: this.currentYModel
      });
    };

    ChartView.prototype.convertData = function(options) {
      var i, id, value, _ref1, _ref2,
        _this = this;
      i = 0;
      _ref1 = options.data.columnsForX;
      for (id in _ref1) {
        value = _ref1[id];
        this.rawData[id] = {
          x: value[0].getColumnData(),
          yValues: {}
        };
      }
      _ref2 = options.data.columnsForY;
      for (id in _ref2) {
        value = _ref2[id];
        value.forEach(function(column) {
          i++;
          return _this.rawData[id].yValues[column.columnName] = column.getColumnData();
        });
      }
      this.model.setNumY(i !== 1);
      return this.data = this.convertJSONForD3(this.rawData);
    };

    ChartView.prototype.convertJSONForD3 = function(data) {
      var color_idx, colors, column, d3Data, dataSetNameClean, dataset, i, series;
      d3Data = [];
      colors = ["red", "blue", "green", "black", "magenta", "cyan"];
      i = 0;
      series = 0;
      color_idx = 0;
      for (dataset in data) {
        for (column in data[dataset].yValues) {
          dataSetNameClean = this.cleanName(dataset);
          d3Data.push({
            key: dataSetNameClean + " - " + column,
            values: [],
            color: colors[color_idx]
          });
          color_idx++;
          i = 0;
          while (i < data[dataset].x.length) {
            d3Data[series].values.push({
              x: new Date(data[dataset].x[i]).getTime(),
              y: +data[dataset].yValues[column][i]
            });
            i++;
          }
          series++;
        }
      }
      return d3Data;
    };

    ChartView.prototype.cleanName = function(name) {
      name = name.split('_');
      name = name.map(function(word) {
        var first;
        first = word.slice(0, 1).toUpperCase();
        word = first + word.slice(1, word.length);
        return word;
      });
      name = name.join(' ');
      return name;
    };

    ChartView.prototype.bubbleSort = function(object) {
      var recurse, series;
      recurse = function(array) {
        var i, j, notYetSorted, thisVal;
        if (!Array.isArray(array)) {
          throw array;
        }
        notYetSorted = true;
        i = 0;
        while (notYetSorted) {
          notYetSorted = false;
          j = 0;
          while (j < array.length - 1) {
            thisVal = array[j];
            if (thisVal.x > array[j + 1].x) {
              array[j] = array[j + 1];
              array[j + 1] = thisVal;
              notYetSorted = true;
            }
            j++;
          }
          if (notYetSorted === false) {
            return array;
          }
          i++;
        }
        return array;
      };
      series = 0;
      while (series < object.length) {
        recurse(object[series].values);
        series++;
      }
      return object;
    };

    return ChartView;

  })(DatsyApp.SvgBackboneView);

}).call(this);
