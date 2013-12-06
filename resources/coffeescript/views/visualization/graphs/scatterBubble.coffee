# Simple test data generator

randomData (groups, points) -> # groups,# points per group
  data = []
  shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square']
  random = d3.random.normal()
   
  for (i = 0; i < groups; i++)
    data.push({
      key: 'Group ' + i,
      values: []
    })
   
    for (j = 0; j < points; j++) 
      data[i].values.push({
        x: random()
        y: random()
        size: Math.random()
        #, shape: shapes[j % 6]
      })
   
  return data

renderScatterBubbleGraph ->
  return nv.addGraph ->
    chart = nv.models.scatterChart()
      .showDistX(true)
      .showDistY(true)
      .color(d3.scale.category10().range())
     
    chart.xAxis.tickFormat(d3.format('.02f'))
    chart.yAxis.tickFormat(d3.format('.02f'))
     
    d3.select('#graph svg')
      .datum(randomData(4,40))
      .transition().duration(500)
      .call(chart)
     
    return chart
    