class DatsyApp.VisualizationData extends Backbone.Collection

  initialize: (options) ->
    @allColumns =  {}
    @buildColumnRequest options.columns
    @columnsForY = []
    @columnsForX = []
    @totalLoaded = 0
    @total = 0
    @makeRequests()
    @
    # Multiple X columns? DEAL WITH ME FUCKER

  buildColumnRequest: (columns) ->
    columns.forEach (column) =>
      @allColumns[column.datasetID] = @allColumns[column.datasetID] || []
      @allColumns[column.datasetID].push column.columnName
      @allColumns[column.datasetID].push 'date' if @allColumns[column.datasetID].indexOf('date') is -1

  makeRequests: ->
    for id, columnArray of @allColumns
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

  tagLoaded: =>
    @totalLoaded++
    if @totalLoaded == @total
      @trigger 'loaded'
    @
