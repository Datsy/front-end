class DatsyApp.ChartView extends DatsyApp.SvgBackboneView
  events: {}
  tagName: "svg"

  initialize: (options) ->
    @currentXModel = null
    @currentYModel = null
    @chartWidth = $(".container").width()
    @chartHeight = @chartWidth / 2
    @rawData =
      x: []
      yValues: {}

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
    _this = this
    @rawData.x = options.data.columnsForX[0].getColumnData()
    options.data.columnsForY.forEach (column) ->
      _this.rawData.yValues[column.columnName] = column.getColumnData()

    @data = @convertJSONForD3(@rawData)

  convertJSONForD3: (data) ->
    d3Data = []
    colors = ["red", "blue", "green", "black", "magenta", "cyan"]
    i = 0
    for key of data.yValues
      d3Data.push
        key: key
        values: []
        color: colors[i]

      i++
    i = 0

    while i < data.x.length
      d3Data.forEach (item) ->
        item.values.push
          x: new Date(data.x[i]).getTime()
          y: +data.yValues[item.key][i]


      i++
    d3Data