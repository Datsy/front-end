(function() {
  DatsyApp.ChartView.visualizations.helpers.DatsyApp.ChartView.visualizations.graphs.renderStackedAreaChart = function(data) {
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
        return d3.time.format("%b")(new Date(d));
      });
      chart.yAxis.tickFormat(d3.format("$,.2f"));
      d3.select("#graph svg").datum(newData).transition().duration(500).call(chart);
      return chart;
    });
  };

}).call(this);
