/*
# Simple test data generator
*/


(function() {
  DatsyApp.ChartView.visualizations.helpers.randomData = function(groups, points) {
    var data, i, j, random, shapes;
    data = [];
    shapes = ["circle", "cross", "triangle-up", "triangle-down", "diamond", "square"];
    random = d3.random.normal();
    i = 0;
    while (i < groups) {
      data.push({
        key: "Group " + i,
        values: []
      });
      j = 0;
      while (j < points) {
        data[i].values.push({
          x: random(),
          y: random(),
          size: Math.random()
        });
        j++;
      }
      i++;
    }
    return data;
  };

  DatsyApp.ChartView.visualizations.graphs.renderScatterBubbleGraph = function() {
    return nv.addGraph(function() {
      var chart;
      chart = nv.models.scatterChart().showDistX(true).showDistY(true).color(d3.scale.category10().range());
      chart.xAxis.tickFormat(d3.format(".02f"));
      chart.yAxis.tickFormat(d3.format(".02f"));
      d3.select("#graph svg").datum(randomData(4, 40)).transition().duration(500).call(chart);
      return chart;
    });
  };

}).call(this);
