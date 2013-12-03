class DatsyApp.VisualizationDataColumn extends Backbone.Model

  initialize: (options) ->
    @columnName = options.columnName
    @datasetID = options.datasetID
    @url = '/column?id=' + @datasetID + '&name=' + @columnName + '&rows=ALL'
    @fetch @url

  fetch: (url) ->
    $.ajax {
      url: url,
      method: 'GET',
      success: (data) =>
        @setColumnData data
    }

  setColumnData: (data) =>
    @columnsData = data;