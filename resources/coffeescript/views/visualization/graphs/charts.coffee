class DatsyApp.Charts
  helpers: new DatsyApp.ChartHelpers()

  renderLineChart: (data) ->
    nv.addGraph ->
      chart = nv.models.lineWithFocusChart()
      chart.xAxis.tickFormat (d) ->
        d3.time.format("%b %d, '%y") new Date(d)
        

      chart.x2Axis.tickFormat (d) ->
        d3.time.format("%b %d, '%y") new Date(d)

      chart.yAxis.tickFormat d3.format(",.2f")
      chart.y2Axis.tickFormat d3.format(",.2f")
      d3.select("#graph svg").datum(data).transition().duration(500).call chart
      
      chart

  renderLineChart2Y: (data) ->
    i = 0
    columns = [];

    # Set Data type to 'Line'
    # while i < data.length
    #   data[i].type = "line"
    #   i++
    
    # TODO: Create loop to specify y-axis if colname is the same or different
    data[0].yAxis = 1
    data[0].type = 'bar'
    data[1].yAxis = 2
    data[1].type = 'line'

    return nv.addGraph ->
      chart = nv.models.multiChart()
        .margin({top: 30, right: 60, bottom: 50, left: 70})
        .color(d3.scale.category10().range())

      chart.xAxis.tickFormat (d) ->
        d3.time.format("%b %d, '%y") new Date(d)

      chart.yAxis1
        .tickFormat(d3.format(',.1f'))

      chart.yAxis2
        .tickFormat(d3.format(',.1f'))

      d3.select('#graph svg')
          .datum(data)
        .transition().duration(500).call(chart)

      return chart

  renderScatterBubbleGraph: ->
    nv.addGraph ->
      chart = nv.models.scatterChart().showDistX(true).showDistY(true).color(d3.scale.category10().range())
      chart.xAxis.tickFormat d3.format(".02f")
      chart.yAxis.tickFormat d3.format(".02f")
      d3.select("#graph svg").datum(Charts.prototype.helpers.randomData(4, 40)).transition().duration(500).call chart
      
      # nv.utils.windowResize(chart.update);
      chart

  renderStackedMultiBar: (data) ->
    nv.addGraph ->
      chart = nv.models.multiBarChart()
       
      chart.xAxis
        .tickFormat (d) ->
          return d3.time.format('%b')(new Date(d))
       
      chart.yAxis
        .tickFormat(d3.format(',.2f'))

      d3.select('#graph svg')
        .datum(data)
        .transition().duration(500).call(chart)
      
      return chart

  renderStackedAreaChart: (data) ->
    convertData = (data) ->
      convertedData = []
      series = 0

      while series < data.length
        convertedData[series] = {
          key: data[series].key
          values: []
          color: data[series].color
        }

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
        d3.time.format("%b %d, '%y") new Date(d)

      chart.yAxis.tickFormat d3.format(",.2f")
      d3.select("#graph svg").datum(newData).transition().duration(500).call chart
      
      chart

