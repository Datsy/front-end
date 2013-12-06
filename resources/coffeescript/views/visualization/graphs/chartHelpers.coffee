class DatsyApp.ChartHelpers extends DatsyApp.ChartView
  sinAndCos: ->
    sin = []
    cos = []
    i = 0

    while i < 100
      sin.push
        x: i
        y: Math.sin(i / 10)

      cos.push
        x: i
        y: .5 * Math.cos(i / 10)

      i++
    [
      values: sin
      key: "Sine Wave"
      color: "#ff7f0e"
    ,
      values: cos
      key: "Cosine Wave"
      color: "#2ca02c"
    ]

  # Inspired by Lee Byron's test data generator. 
  stream_layers: (n, m, o) ->
    bump = (a) ->
      x = 1 / (.1 + Math.random())
      y = 2 * Math.random() - .5
      z = 10 / (.1 + Math.random())
      i = 0

    while i < m
      w = (i / m - y) * z
      a[i] += x * Math.exp(-w * w)
      i++
    o = 0  if arguments_.length < 3
    d3.range(n).map ->
      a = []
      i = undefined
      i = 0
      while i < m
        a[i] = o + o * Math.random()
        i++
      i = 0
      while i < 5
        bump a
        i++
      a.map stream_index


  # Another layer generator using gamma distributions. 
  stream_waves: (n, m) ->
    d3.range(n).map (i) ->
      d3.range(m).map((j) ->
        x = 20 * j / m - i / 3
        2 * x * Math.exp(-.5 * x)
      ).map stream_index

  stream_index: (d, i) ->
    x: i
    y: Math.max(0, d)

  findMinMax: (data) -> 
    propertiesArray = Array.prototype.slice.call(arguments, 1)
    concatArr = []

    i = 0

    while i < data.length
      j = 0

      while j < propertiesArray.length
        concatArr.push data[i][propertiesArray[j]]
        j++
      i++
    i = 0
    while i < concatArr.length
      curVal = concatArr[i]
      min = curVal  unless min
      max = curVal  unless max
      min = curVal  if curVal < min
      max = curVal  if curVal > max
      i++

    return { min: min, max: max }

  randomData = (groups, points) -> ## groups,# points per group
    data = []
    shapes = ["circle", "cross", "triangle-up", "triangle-down", "diamond", "square"]
    random = d3.random.normal()
    i = 0
    while i < groups
      data.push
        key: "Group " + i
        values: []

      j = 0
      while j < points
        data[i].values.push
          x: random()
          y: random()
          size: Math.random()

        j++
      i++
    
    #, shape: shapes[j % 6]
    data

  convertDataforStackedAreaChart = (data) ->
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

