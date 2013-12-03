class DatsyApp.VisualizationData extends Backbone.Collection

  initialize: (options) ->
    allColumns =  {}
    options.columns.forEach (column) =>
      allColumns[column.datasetID] = allColumns[column.datasetID] || []
      allColumns[column.datasetID].push column.columnName
      allColumns[column.datasetID].push 'date' if allColumns[column.datasetID].indexOf('date') is -1
    console.log allColumns
    @columnsForY = []
    # allColumns.forEach (column) =>
    #   newY = new DatsyApp.VisualizationDataColumn { columnName: column.columnName, datasetID: column.datasetID }
    #   @columnsForY.push newY

