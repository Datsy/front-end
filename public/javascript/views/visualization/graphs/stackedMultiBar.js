(function() {
  DatsyApp.ChartView.visualizations.graphs.renderStackedMultiBar = function(data) {
    return nv.addGraph(function() {
      var chart;
      chart = nv.models.multiBarChart();
      chart.xAxis.tickFormat(function(d) {
        return d3.time.format('%b')(new Date(d));
      });
      chart.yAxis.tickFormat(d3.format('$,.2f'));
      d3.select('#graph svg').datum(data).transition().duration(500).call(chart);
      return chart;
    });
  };

}).call(this);
