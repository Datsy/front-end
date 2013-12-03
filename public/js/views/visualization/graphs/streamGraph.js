var renderStreamGraph = function() {
  console.log('render stream graph');
  // Inspired by Lee Byron's test data generator.
  var bumpLayer = function(n) {

    var bump = function(a) {
      var x = 1 / (.1 + Math.random()),
          y = 2 * Math.random() - .5,
          z = 10 / (.1 + Math.random());
      for (var i = 0; i < n; i++) {
        var w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    };

    var a = [], i;
    for (i = 0; i < n; ++i) a[i] = 0;
    for (i = 0; i < 5; ++i) bump(a);
    return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
  };

  var n = 20, // number of layers
  m = 200, // number of samples per layer
  stack = d3.layout.stack().offset("wiggle"),
  layers0 = stack(d3.range(n).map(function() { return bumpLayer(m); })),
  layers1 = stack(d3.range(n).map(function() { return bumpLayer(m); }));

  d3.select(this.el).remove();

  var x = d3.scale.linear()
    .domain([0, m - 1])
    .range([0, this.width]);

  var y = d3.scale.linear()
    .domain([0, d3.max(layers0.concat(layers1), function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
    .range([this.height, 0]);

  var margin = this.margin;
  var minDate = this.minDate;
  var maxDate = this.maxDate;

  var chart = d3.select(this.el)
      .attr('width', this.width + this.margin.right + this.margin.left)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

  var g = chart.append('svg:g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

  var color = d3.scale.linear()
      .range(["#aad", "#556"]);

  var area = d3.svg.area()
      .x(function(d) { return x(d.x); })
      .y0(function(d) { return y(d.y0); })
      .y1(function(d) { return y(d.y0 + d.y); });

  chart.selectAll("path")
      .data(layers0)
    .enter().append("path")
      .attr("d", area)
      .style("fill", function() { return color(Math.random()); });

  return chart;
};