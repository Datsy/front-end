(function() {
  DatsyApp.Charts = (function() {
    function Charts() {}

    Charts.prototype.helpers = new DatsyApp.ChartHelpers();

    Charts.prototype.renderLineChart = function(data) {
      return nv.addGraph(function() {
        var chart;
        chart = nv.models.lineWithFocusChart();
        chart.xAxis.tickFormat(function(d) {
          return d3.time.format("%b %d, '%y")(new Date(d));
        });
        chart.x2Axis.tickFormat(function(d) {
          return d3.time.format("%b %d, '%y")(new Date(d));
        });
        chart.yAxis.tickFormat(d3.format(",.2f"));
        chart.y2Axis.tickFormat(d3.format(",.2f"));
        d3.select("#graph svg").datum(data).transition().duration(500).call(chart);
        return chart;
      });
    };

    Charts.prototype.renderLineChart2Y = function(data) {
      var columns, i;
      i = 0;
      columns = [];
      data[0].yAxis = 1;
      data[0].type = 'bar';
      data[1].yAxis = 2;
      data[1].type = 'line';
      return nv.addGraph(function() {
        var chart;
        chart = nv.models.multiChart().margin({
          top: 30,
          right: 60,
          bottom: 50,
          left: 70
        }).color(d3.scale.category10().range());
        chart.xAxis.tickFormat(function(d) {
          return d3.time.format("%b %d, '%y")(new Date(d));
        });
        chart.yAxis1.tickFormat(d3.format(',.1f'));
        chart.yAxis2.tickFormat(d3.format(',.1f'));
        d3.select('#graph svg').datum(data).transition().duration(500).call(chart);
        return chart;
      });
    };

    Charts.prototype.renderScatterBubbleGraph = function() {
      return nv.addGraph(function() {
        var chart;
        chart = nv.models.scatterChart().showDistX(true).showDistY(true).color(d3.scale.category10().range());
        chart.xAxis.tickFormat(d3.format(".02f"));
        chart.yAxis.tickFormat(d3.format(".02f"));
        d3.select("#graph svg").datum(Charts.prototype.helpers.randomData(4, 40)).transition().duration(500).call(chart);
        return chart;
      });
    };

    Charts.prototype.renderStackedMultiBar = function(data) {
      return nv.addGraph(function() {
        var chart;
        chart = nv.models.multiBarChart();
        chart.xAxis.tickFormat(function(d) {
          return d3.time.format('%b')(new Date(d));
        });
        chart.yAxis.tickFormat(d3.format(',.2f'));
        d3.select('#graph svg').datum(data).transition().duration(500).call(chart);
        return chart;
      });
    };

    Charts.prototype.renderStackedAreaChart = function(data) {
      debugger;
      var convertData, newData;
      convertData = function(data) {
        var convertedData, i, series;
        convertedData = [];
        series = 0;
        while (series < data.length) {
          convertedData[series] = {
            key: data[series].key,
            values: [],
            color: data[series].color
          };
          i = 0;
          while (i < data[series].values.length) {
            convertedData[series].values[i] = [data[series].values[i].x, data[series].values[i].y];
            i++;
          }
          series++;
        }
        return convertedData;
      };
      newData = convertData(data);
      return nv.addGraph(function() {
        var chart;
        chart = nv.models.stackedAreaChart().x(function(d) {
          return d[0];
        }).y(function(d) {
          return d[1];
        }).clipEdge(true);
        chart.xAxis.showMaxMin(false).tickFormat(function(d) {
          return d3.time.format("%b %d, '%y")(new Date(d));
        });
        chart.yAxis.tickFormat(d3.format(",.2f"));
        d3.select("#graph svg").datum(newData).transition().duration(500).call(chart);
        return chart;
      });
    };

    return Charts;

  })();

}).call(this);
