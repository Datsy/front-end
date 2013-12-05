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

var renderLineChart = function(data) {
  return nv.addGraph(function() {
    var chart = nv.models.lineWithFocusChart();

    chart.xAxis
      .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)); });

    chart.x2Axis
      .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)); });

    chart.yAxis
      .tickFormat(d3.format('$,.2f'));
     
    chart.y2Axis
      .tickFormat(d3.format('$,.2f'));

    d3.select('#graph svg')
      .datum(data)
      .transition().duration(500)
      .call(chart);
     
    // nv.utils.windowResize(chart.update);
     
    return chart;
  });
};