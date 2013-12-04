function exampleData() {
  return stream_layers(3,10+Math.random()*100,.1).map(function(data, i) {
    return {
      key: 'Stream' + i,
      values: data
    };
  });
}

// Stacked MultiBar Chart
var renderStackedMultiBar = function(data) {

  nv.addGraph(function() {
    var chart = nv.models.multiBarChart();
     
    chart.xAxis
      .tickFormat(function(d) { return d3.time.format('%b')(new Date(d)); });
     
    chart.yAxis
      .tickFormat(d3.format('$,.2f'));

    d3.select('#graph svg')
      .datum(data)
      .transition().duration(500).call(chart);

    nv.utils.windowResize(chart.update);
     
    return chart;
  });
}
