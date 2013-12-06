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
      this.rawData = {
        x: [],
        yValues: {}
      };
      debugger;
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
      this.chartHelpers = new DatsyApp.ChartHelpers();
      return this.graphs = new DatsyApp.Graphs();
    };

    ChartView.prototype.render = function() {
      var chartType;
      d3.select(this.el).selectAll("*").remove();
      chartType = this.model.get("chartType");
      if (chartType === "lineChart") {
        console.log('data: ', this.data);
        this.graphs.renderLineChart(this.data);
      } else if (chartType === "lineChart2Y") {
        this.visualizations.graphs.renderLineChart2Y(this.data);
      } else if (chartType === "stackedArea") {
        this.visualizations.graphs.renderStackedAreaChart(this.data);
      } else if (chartType === "stackedMultiBar") {
        this.visualizations.graphs.renderStackedMultiBar(this.data);
      } else {
        if (chartType === "scatterBubble") {
          this.visualizations.graphs.renderScatterBubbleGraph(this.data);
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
      var _this;
      _this = this;
      this.rawData.x = options.data.columnsForX[0].getColumnData();
      options.data.columnsForY.forEach(function(column) {
        return _this.rawData.yValues[column.columnName] = column.getColumnData();
      });
      return this.data = this.convertJSONForD3(this.rawData);
    };

    ChartView.prototype.convertJSONForD3 = function(data) {
      var colors, d3Data, i, key;
      d3Data = [];
      colors = ["red", "blue", "green", "black", "magenta", "cyan"];
      i = 0;
      for (key in data.yValues) {
        d3Data.push({
          key: key,
          values: [],
          color: colors[i]
        });
        i++;
      }
      i = 0;
      while (i < data.x.length) {
        d3Data.forEach(function(item) {
          return item.values.push({
            x: new Date(data.x[i]).getTime(),
            y: +data.yValues[item.key][i]
          });
        });
        i++;
      }
      return d3Data;
    };

    return ChartView;

  })(DatsyApp.SvgBackboneView);

}).call(this);
