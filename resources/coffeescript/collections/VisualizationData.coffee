class DatsyApp.VisualizationData extends Backbone.Collection

  initialize: (options) ->
    @columnsForY = {}
    @columnsForX = {}
    @totalLoaded = 0
    @total = 0
    @

  setVisualizationData: (cart) ->
    for id, columnArray of cart
      columnArray.push('Date') if columnArray.indexOf('Date') is -1
    @makeRequests cart

  makeRequests: (cart) ->
    for id, columnArray of cart
      @columnsForX[id] = [] if !@columnsForX[id]
      @columnsForY[id] = [] if !@columnsForY[id]
      columnArray.forEach (name) =>
        @total++
        if name is 'Date'
          newX = new DatsyApp.VisualizationDataColumn { columnName: 'Date', datasetName: id }
          @columnsForX[id].push newX
          newX.on 'loaded', @tagLoaded
        else
          newY = new DatsyApp.VisualizationDataColumn { columnName: name, datasetName: id }
          @columnsForY[id].push newY
          newY.on 'loaded', @tagLoaded
    @

  tagLoaded: =>
    @totalLoaded++
    if @totalLoaded == @total
      @trigger 'loaded'
    @

  clearOldData: ->
    @initialize()