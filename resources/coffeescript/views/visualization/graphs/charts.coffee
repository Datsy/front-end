class DatsyApp.Graphs extends DatsyApp.ChartView
  renderLineChart: (data) ->
    nv.addGraph ->
      chart = nv.models.lineWithFocusChart()
      chart.xAxis.tickFormat (d) ->
        d3.time.format("%b %d") new Date(d)

      chart.x2Axis.tickFormat (d) ->
        d3.time.format("%b %d") new Date(d)

      chart.yAxis.tickFormat d3.format("$,.2f")
      chart.y2Axis.tickFormat d3.format("$,.2f")
      d3.select("#graph svg").datum(data).transition().duration(500).call chart
      
      chart

  renderLineChart2Y = (data) ->
    testdata = stream_layers(7, 10 + Math.random() * 100, .1).map (data, i) ->
      key: "Stream" + i
      values: data.map (a) ->
        a.y = a.y * (if i <= 1 then -1 else 1)
        a

    testdata[0].type = "area"
    testdata[0].yAxis = 1
    testdata[1].type = "area"
    testdata[1].yAxis = 1
    testdata[2].type = "line"
    testdata[2].yAxis = 1
    testdata[3].type = "line"
    testdata[3].yAxis = 2
    testdata[4].type = "bar"
    testdata[4].yAxis = 2
    testdata[5].type = "bar"
    testdata[5].yAxis = 2
    testdata[6].type = "bar"
    testdata[6].yAxis = 2

    return nv.addGraph ->
      chart = nv.models.multiChart()
        .margin({top: 30, right: 60, bottom: 50, left: 70})
        .color(d3.scale.category10().range())

      chart.xAxis
        .tickFormat(d3.format(',f'))

      chart.yAxis1
        .tickFormat(d3.format(',.1f'))

      chart.yAxis2
        .tickFormat(d3.format(',.1f'))


      d3.select('#graph svg')
          .datum(testdata)
        .transition().duration(500).call(chart)

      return chart

  renderScatterBubbleGraph = ->
    nv.addGraph ->
      chart = nv.models.scatterChart().showDistX(true).showDistY(true).color(d3.scale.category10().range())
      chart.xAxis.tickFormat d3.format(".02f")
      chart.yAxis.tickFormat d3.format(".02f")
      d3.select("#graph svg").datum(randomData(4, 40)).transition().duration(500).call chart
      
      # nv.utils.windowResize(chart.update);
      chart

  renderStackedMultiBar = (data) ->
    nv.addGraph ->
      chart = nv.models.multiBarChart()
       
      chart.xAxis
        .tickFormat (d) ->
          return d3.time.format('%b')(new Date(d))
       
      chart.yAxis
        .tickFormat(d3.format('$,.2f'))

      d3.select('#graph svg')
        .datum(data)
        .transition().duration(500).call(chart)
      
      return chart

renderStackedAreaChart = (data) ->
  convertData = (data) ->
    convertedData = []
    series = 0

    while series < data.length
      convertedData[series] =
        key: data[series].key
        values: []
        color: data[series].color

      i = 0

      while i < data[series].values.length
        convertedData[series].values[i] = [data[series].values[i].x, data[series].values[i].y]
        i++
      series++
    convertedData

  newData = convertData(data)
  nv.addGraph ->
    chart = nv.models.stackedAreaChart().x((d) ->
      d[0]
    ).y((d) ->
      d[1]
    ).clipEdge(true)
    chart.xAxis.showMaxMin(false).tickFormat (d) ->
      d3.time.format("%b") new Date(d)

    chart.yAxis.tickFormat d3.format("$,.2f")
    d3.select("#graph svg").datum(newData).transition().duration(500).call chart
    
    # nv.utils.windowResize(chart.update);
    chart

