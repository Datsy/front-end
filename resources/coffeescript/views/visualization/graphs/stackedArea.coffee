convertData = (data) ->
  convertedData = []

  for(series = 0; series < data.length; series++)
    convertedData[series] = {
      key: data[series].key
      values: []
      color: data[series].color
    }
    
    for(var i = 0; i < data[series].values.length; i++)
      convertedData[series].values[i] = [data[series].values[i].x, data[series].values[i].y]

  return convertedData

# Stacked Area Chart
renderStackedAreaChart = (data) ->
  newData = convertData(data)

  nv.addGraph ->
    chart = nv.models.stackedAreaChart()
      .x (d) -> 
        return d[0]
      .y (d) -> 
        return d[1]
      .clipEdge(true)
     
    chart.xAxis
      .showMaxMin(false)
      .tickFormat( (d) -> 
        return d3.time.format('%b')(new Date(d))
     
    chart.yAxis
      .tickFormat(d3.format('$,.2f'))
     
    d3.select('#graph svg')
      .datum(newData)
        .transition().duration(500).call(chart)

    return chart