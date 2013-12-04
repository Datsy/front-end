var convertData = function(data) {
  var convertedData = [];

  for(var series = 0; series < data.length; series++){
    convertedData[series] = {
      key: data[series].key,
      values: [],
      color: data[series].color
    };
    
    for(var i = 0; i < data[series].values.length; i++){
      convertedData[series].values[i] = [data[series].values[i].x, data[series].values[i].y];
    }
  }

  return convertedData;
};

// Stacked Area Chart
var renderStackedAreaChart = function(data){
  var newData = convertData(data);

  nv.addGraph(function() {
    var chart = nv.models.stackedAreaChart()
      .x(function(d) { return d[0]; })
      .y(function(d) { return d[1]; })
      .clipEdge(true);
     
    chart.xAxis
      .tickFormat(function(d) { return d3.time.format('%b')(new Date(d)); });
     
    chart.yAxis
      .tickFormat(d3.format('$,.2f'));
     
    d3.select('#graph svg')
      .datum(newData)
        .transition().duration(500).call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
};