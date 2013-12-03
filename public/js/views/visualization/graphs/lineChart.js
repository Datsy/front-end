function sinAndCos() {
  var sin = [],
  cos = [];
   
  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    cos.push({x: i, y: .5 * Math.cos(i/10)});
  }
   
  return [
    {
      values: sin,
      key: 'Sine Wave',
      color: '#ff7f0e'
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    }
  ];
}

/* Inspired by Lee Byron's test data generator. */
function stream_layers(n, m, o) {
  if (arguments.length < 3) o = 0;
  function bump(a) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    for (var i = 0; i < m; i++) {
      var w = (i / m - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }
  return d3.range(n).map(function() {
      var a = [], i;
      for (i = 0; i < m; i++) a[i] = o + o * Math.random();
      for (i = 0; i < 5; i++) bump(a);
      return a.map(stream_index);
    });
}

/* Another layer generator using gamma distributions. */
function stream_waves(n, m) {
  return d3.range(n).map(function(i) {
    return d3.range(m).map(function(j) {
        var x = 20 * j / m - i / 3;
        return 2 * x * Math.exp(-.5 * x);
      }).map(stream_index);
    });
}

function stream_index(d, i) {
  return {x: i, y: Math.max(0, d)};
}


function testData() {
  return stream_layers(3,128,.1).map(function(data, i) {
    return { 
      key: 'Stream' + i,
      values: data
    };
  });
};

var renderLineChart = function() {
   return nv.addGraph(function() {
    var chart = nv.models.lineWithFocusChart();
     
    chart.xAxis
    .tickFormat(d3.format(',f'));
     
    chart.yAxis
    .tickFormat(d3.format(',.2f'));
     
    chart.y2Axis
    .tickFormat(d3.format(',.2f'));
     
    d3.select('#graph svg')
    .datum(testData())
    .transition().duration(500)
    .call(chart);
     
    nv.utils.windowResize(chart.update);
     
    return chart;
  });
  // return nv.addGraph(function() {  
  //   var chart = nv.models.lineChart();
     
  //   chart.xAxis
  //   .axisLabel('Time (ms)')
  //   .tickFormat(d3.format(',r'));
     
  //   chart.yAxis
  //   .axisLabel('Voltage (v)')
  //   .tickFormat(d3.format('.02f'));
     
  //   d3.select('#graph svg')
  //   .datum(sinAndCos())
  //   .transition().duration(500)
  //   .call(chart);
     
  //   nv.utils.windowResize(function() { d3.select('#chart svg').call(chart) });
     
  //   return chart;
  // });
}

// var renderLineChart = function(el, data, options) {
//   console.log('render line chart');
//   var xRange = this.findMinMax(data, 'xAxis');
//   var yRange = this.findMinMax(data, 'series1', 'series2');
//   var minDate = xRange.min;
//   var maxDate = xRange.max;

//   var y = d3.scale.linear()
//       .domain([yRange.min, yRange.max])
//       .range([options.height - options.padding, options.padding]);

//   var x = d3.time.scale()
//       .domain([minDate, maxDate])
//       .range([options.padding, options.width - options.padding]);

//   var chart = d3.select(el)
//       .attr('width', options.width + options.margin.right + options.margin.left)
//       .attr('height', options.height + options.margin.top + options.margin.bottom);

//   chart.selectAll("line.horizontalGrid").data(y.ticks(10)).enter()
//       .append("line")
//         .attr(
//         {
//           "class":"horizontalGrid",
//           "x1" : options.padding + options.margin.left,
//           "x2" : options.width - options.margin.left,
//           "y1" : function(d){ return y(d);},
//           "y2" : function(d){ return y(d);},
//           "fill" : "none",
//           "shape-rendering" : "crispEdges",
//           "stroke" : "#999",
//           "stroke-dasharray": "2,1",
//           "stroke-width" : "1px"
//         });

//   var g = chart.append('svg:g')
//       .attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');

//   // Plot first data series
//   var line1 = d3.svg.line()
//       .x(function(d, i) { return x(d.xAxis); })
//       .y(function(d) { return y(d.series1) - options.margin.top; });
  
//   g.append('svg:path')
//     .attr('d', line1(data))
//     .style('stroke', 'blue');  // TODO: Should be assigned a color in progressive order
  
//   // Plot second data series
//   var line2 = d3.svg.line()
//       .x(function(d, i) { return x(d.xAxis); })
//       .y(function(d) { return y(d.series2) - options.margin.top; });
//   g.append('svg:path')
//     .attr('d', line2(data))
//     .style('stroke', 'red');  // TODO: should be assigned a color in progressive order

//   var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient('bottom')
//     .ticks(12)
//     .tickFormat(d3.time.format('%b'));

//   chart.append('g')
//     .attr('class', 'x axis')
//     .attr('transform', 'translate(' + options.margin.left + ',' + (options.height - options.padding + 20) + ")")
//     .call(xAxis)
//     .selectAll("text")
//       .attr("y", 0)
//       .attr("x", 9)
//       .attr("dy", ".35em")
//       .attr("transform", "rotate(90)")
//       .style("text-anchor", "start")
//       .style('font-size', '1.1em');

//   var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient('left')
//     .ticks(5, '$');

//   chart.append('g')
//     .attr('class', 'y axis')
//     .attr('transform', 'translate(' + options.padding + ',0)')
//     .call(yAxis)
//     .selectAll('text')
//       .style('font-size', '1.1em');

//   return chart;
// };