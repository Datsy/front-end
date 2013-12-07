class DatsyApp.VisView extends Backbone.View
  className: "visView container"
  events:
    "click button#lineChart": "renderLineChart"
    "click button#lineChart2Y": "renderLineChart2Y"
    "click button#stackedArea": "renderStackedArea"
    "click button#scatterBubble": "renderScatterBubble"
    "click button#stackedMultiBar": "renderStackedMultiBar"
    "click button#downloadPhoto": "downloadPhoto"
    'click .try-again-button': 'navigateToHome'

  initialize: ->
    @dataLoaded = false
    @loadingTemplate = @model.get("templates")["visualizeLoading"]
    @template = @model.get("templates")["visualize"]
    @failedTemplate = @model.get('templates')['failedTemplate']
    _this = this
    @listenTo window, "resize", @resize
    setTimeout (=>
      if !@dataLoaded
        console.log '10 seconds past, no response'
        @renderFailed()
    ),10000
    @model.on "visualizationDataLoaded", =>
      @dataLoaded = true
      @currentGraphView = new DatsyApp.ChartView(
        model: @model
        data: @model.get("visualizationData")
      )
      @renderLoaded()


  resize: ->
    # SUB VIEWS NEED TO LISTEN FOR RESIZE AND DRAW
    @currentGraphView.remove()
    @currentGraphView = new DatsyApp.ChartView(
      model: @model
      data: @model.get("visualizationData")
    )
    width = $(".container").width()
    height = width / 2
    @$graph = @$el.find("#graph")
    @$graph.css
      height: height
      width: width

    @$graph.append @currentGraphView.render()

  renderFailed: ->
    console.log 'failed template loading'
    @$el.html @failedTemplate
    @

  render: ->
    @$el.html @loadingTemplate
    @

  renderLoaded: (chartType) ->
    @$el.html @template
    w = $(".container").width()
    h = w / 2
    @$graph = @$el.find("#graph")
    @$graph.css
      height: h
      width: w

    @$graph.append @currentGraphView.render(chartType)
    @

  renderLineChart: ->
    @model.set "chartType", "lineChart"
    @renderLoaded()

  renderLineChart2Y: ->
    @model.set "chartType", "lineChart2Y"
    @renderLoaded()

  renderStackedArea: ->
    @model.set "chartType", "stackedArea"
    @renderLoaded()

  renderStackedMultiBar: ->
    @model.set "chartType", "stackedMultiBar"
    @renderLoaded()

  renderScatterBubble: ->
    @model.set "chartType", "scatterBubble"
    @renderLoaded()

  downloadPhoto: ->
    dumpComputedStyles = (elem, prop) ->
      styles = {}
      cs = window.getComputedStyle(elem, null)
      if cs
        len = cs.length
        i = 0

        while i < len
          style = cs[i]
          styles[style] = cs.getPropertyValue(style)
          i++
      styles
    svg = document.getElementsByTagName("svg")[0]
    chartArea = document.getElementsByTagName("svg")[0].parentNode
    canvas = document.createElement("canvas")
    canvas.setAttribute "width", chartArea.offsetWidth
    canvas.setAttribute "height", chartArea.offsetHeight
    canvas.setAttribute "display", "none"
    canvas.setAttribute "style", "position: absolute; " + "top: " + (-chartArea.offsetHeight * 2) + "px;" + "left: " + (-chartArea.offsetWidth * 2) + "px;"
    document.body.appendChild canvas
    appendStyles = (node) ->
      styles = dumpComputedStyles(node)
      
      # node.style = styles;
      for key of styles
        node[key] = styles[key]

      i = 0

      while i < node.childNodes.length
        appendStyles node.childNodes[i]
        i++
      node

    svg = appendStyles(svg)
    canvg canvas, svg.parentNode.innerHTML
    Canvas2Image.saveAsPNG canvas
    canvas.parentNode.removeChild canvas

  navigateToHome: =>
    Backbone.history.navigate '/', { trigger: true }

