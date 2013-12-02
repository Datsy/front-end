var renderLineChart = function(el, data, options) {
  console.log('render line chart');
  var xRange = this.findMinMax(data, 'xAxis');
  var yRange = this.findMinMax(data, 'series1', 'series2');
  var minDate = xRange.min;
  var maxDate = xRange.max;

  var y = d3.scale.linear()
      .domain([yRange.min, yRange.max])
      .range([options.height - options.padding, options.padding]);

  var x = d3.time.scale()
      .domain([minDate, maxDate])
      .range([options.padding, options.width - options.padding]);

  var chart = d3.select(el)
      .attr('width', options.width + options.margin.right + options.margin.left)
      .attr('height', options.height + options.margin.top + options.margin.bottom);

  chart.selectAll("line.horizontalGrid").data(y.ticks(10)).enter()
      .append("line")
        .attr(
        {
          "class":"horizontalGrid",
          "x1" : options.padding + options.margin.left,
          "x2" : options.width - options.margin.right,
          "y1" : function(d){ return y(d);},
          "y2" : function(d){ return y(d);},
          "fill" : "none",
          "shape-rendering" : "crispEdges",
          "stroke" : "#999",
          "stroke-dasharray": "2,1",
          "stroke-width" : "1px"
        });

  var g = chart.append('svg:g')
      .attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')');

  // Plot first data series
  var line1 = d3.svg.line()
      .x(function(d, i) { return x(d.xAxis); })
      .y(function(d) { return y(d.series1) - options.margin.top; });
  
  g.append('svg:path')
    .attr('d', line1(data))
    .style('stroke', 'blue');  // TODO: Should be assigned a color in progressive order
  
  // Plot second data series
  var line2 = d3.svg.line()
      .x(function(d, i) { return x(d.xAxis); })
      .y(function(d) { return y(d.series2) - options.margin.top; });
  g.append('svg:path')
    .attr('d', line2(data))
    .style('stroke', 'red');  // TODO: should be assigned a color in progressive order

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(12)
    .tickFormat(d3.time.format('%b'));

  chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(' + options.margin.left + ',' + (options.height - options.padding + 20) + ")")
    .call(xAxis)
    .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start")
      .style('font-size', '1.1em');

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(5, '$');

  chart.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + options.padding + ',0)')
    .call(yAxis)
    .selectAll('text')
      .style('font-size', '1.1em');

  return chart;
};