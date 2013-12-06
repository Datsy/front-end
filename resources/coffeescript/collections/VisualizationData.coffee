class DatsyApp.VisualizationData extends Backbone.Collection

  initialize: (options) ->
    @columnsForY = []
    @columnsForX = []
    @totalLoaded = 0
    @total = 0
    @
    # Multiple X columns? DEAL WITH ME FUCKER

  setVisualizationData: (cart) ->
    for id, columnArray of cart
      columnArray.push('date') if columnArray.indexOf('date') is -1
    @makeRequests cart

  makeRequests: (cart) ->
    for id, columnArray of cart
      columnArray.forEach (name) =>
        @total++
        if name is 'date'
          newX = new DatsyApp.VisualizationDataColumn { columnName: 'date', datasetID: id }
          @columnsForX.push newX
          newX.on 'loaded', @tagLoaded
        else
          newY = new DatsyApp.VisualizationDataColumn { columnName: name, datasetID: id }
          @columnsForY.push newY
          newY.on 'loaded', @tagLoaded
    @

  tagLoaded: =>
    @totalLoaded++
    if @totalLoaded == @total
      @trigger 'loaded'
    @
