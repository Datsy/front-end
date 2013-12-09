class DatsyApp.ChartView extends DatsyApp.SvgBackboneView
  events: {}
  tagName: "svg"

  initialize: (options) ->
    @currentXModel = null
    @currentYModel = null
    @chartWidth = $(".container").width()
    @chartHeight = @chartWidth / 2
    @rawData = {}

    @convertData options

    @margin =
      top: 20
      right: 140
      bottom: 30
      left: 20

    @padding = 50
    @width = @chartWidth - @margin.left - @margin.right
    @height = @chartHeight - @margin.top - @margin.bottom
    @graphs = new DatsyApp.Charts()

  render: ->
    d3.select(@el).selectAll("*").remove()
    chartType = @model.get("chartType")
    if chartType is "lineChart"
      @graphs.renderLineChart @data
    else if chartType is "lineChart2Y"
      @graphs.renderLineChart2Y @data
    else if chartType is "stackedArea"
      @graphs.renderStackedAreaChart @data
    else if chartType is "stackedMultiBar"
      @graphs.renderStackedMultiBar @data
    else @graphs.renderScatterBubbleGraph @data if chartType is "scatterBubble"
    @$el

  renderChart: ->
    @trigger "renderChart",
      chartView: true
      x: @currentXModel
      y: @currentYModel

  convertData: (options) ->
    i = 0
    for id, value of options.data.columnsForX
      @rawData[id] = {
        x: value[0].getColumnData()
        yValues: {}
      }


    for id, value of options.data.columnsForY
      value.forEach (column) =>
        i++
        @rawData[id].yValues[column.columnName] = column.getColumnData()
    @model.setNumY(i != 1)
    @data = @convertJSONForD3(@rawData)

  convertJSONForD3: (data) ->
    d3Data = []
    colors = ["red", "blue", "green", "black", "magenta", "cyan"]
    i = 0
    series = 0
    color_idx = 0
    for dataset of data
      for column of data[dataset].yValues
        dataSetNameClean = @cleanName dataset
        d3Data.push
          key: dataSetNameClean + " - " + column
          values: []
          color: colors[color_idx]
        color_idx++

        i = 0
        while i < data[dataset].x.length
          d3Data[series].values.push({x: new Date(data[dataset].x[i]).getTime()})
          i++
        i = 0
        while i < data[dataset].yValues[column].length
          d3Data[series].values[i].y = +data[dataset].yValues[column][i]
          i++
      series++
    console.log 'd3Data', d3Data
    # @bubbleSort(d3Data)
    d3Data

  cleanName: (name) ->
    name = name.split('_')
    name = name.map (word) ->
      first = word.slice(0,1).toUpperCase();
      word = first + word.slice(1, word.length)
      word
    name = name.join(' ')
    name
  
  bubbleSort: (object) ->
    recurse = (array) ->
      throw array  unless Array.isArray(array)
      notYetSorted = true
      i = 0 # initializing i to pass the test
      while notYetSorted
        notYetSorted = false
        j = 0
        while j < array.length - 1
          thisVal = array[j]
          if thisVal.x > array[j + 1].x
            array[j] = array[j + 1]
            array[j + 1] = thisVal
            notYetSorted = true
          j++
        return array  if notYetSorted is false
        i++
      array

    series = 0
    while series < object.length
      recurse object[series].values
      series++
    object
