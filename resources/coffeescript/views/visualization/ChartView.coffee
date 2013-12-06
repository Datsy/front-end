class DatsyApp.ChartView extends DatsyApp.SvgBackboneView

  tagName: 'svg'

  initialize (options) ->
    this.currentXModel = null
    this.currentYModel = null
    this.chartWidth = $('.container').width()
    this.chartHeight = this.chartWidth / 2
    this.rawData = {
      x: [],
      yValues: {}
    }
    this.convertData(options.data)
    
    this.margin = {top: 20, right: 140, bottom: 30, left: 20}
    this.padding = 50
    this.width = this.chartWidth - this.margin.left - this.margin.right
    this.height = this.chartHeight - this.margin.top - this.margin.bottom

  render ->
    d3.select(this.el).selectAll('*').remove()
    chartType = this.model.get('chartType')

    renderLineChart(this.data) if chartType === 'lineChart'
    renderLineChart2Y(this.data) if chartType === 'lineChart2Y'
    renderStackedAreaChart(this.data) if chartType === 'stackedArea'
    renderStackedMultiBar(this.data) if chartType === 'stackedMultiBar'
    renderScatterBubbleGraph(this.data) if chartType === 'scatterBubble'

    return this.$el;

  renderChart ->
    this.trigger('renderChart', { chartView: true, x: this.currentXModel, y: this.currentYModel })

  convertData (data) ->
    _this = this
    this.rawData.x = data.columnsForX[0].getColumnData()
    _this.rawData.yValues[column.columnName] = column.getColumnData() for column in data.columnsForY
    this.data = this.convertJSONForD3(this.rawData)

  convertJSONForD3 (data) ->
    d3Data = []
    colors = ['red','blue','green','black','magenta','cyan']
    i = 0
    for (key in data.yValues)
      d3Data.push({key: key, values: [], color: colors[i] })
      i++
  
    for(var i = 0; i < data.x.length; i++)
      item.values.push({x: new Date(data.x[i]).getTime(), y: +data.yValues[item.key][i] }) for item in d3Data

    return d3Data
