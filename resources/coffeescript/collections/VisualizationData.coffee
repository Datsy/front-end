class DatsyApp.VisualizationData extends Backbone.Collection

  initialize: (options) ->
    allColumns = options.columns
    @columnsForY = []
    allColumns.forEach (column) =>
      newY = new DatsyApp.VisualizationDataColumn { columnName: column.columnName, datasetID: column.datasetID }
      @columnsForY.push newY

