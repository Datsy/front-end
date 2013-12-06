(function() {
  var testdata;

  DatsyApp.ChartView.visualizations.graphs;

  DatsyApp.ChartView.visualizations.helpers.testdata = testdata = stream_layers(7, 10 + Math.random() * 100, .1).map(function(data, i) {
    return {
      key: "Stream" + i,
      values: data.map(function(a) {
        a.y = a.y * (i <= 1 ? -1 : 1);
        return a;
      })
    };
  });

  testdata[0].type = "area";

  testdata[0].yAxis = 1;

  testdata[1].type = "area";

  testdata[1].yAxis = 1;

  testdata[2].type = "line";

  testdata[2].yAxis = 1;

  testdata[3].type = "line";

  testdata[3].yAxis = 2;

  testdata[4].type = "bar";

  testdata[4].yAxis = 2;

  testdata[5].type = "bar";

  testdata[5].yAxis = 2;

  testdata[6].type = "bar";

  testdata[6].yAxis = 2;

}).call(this);
