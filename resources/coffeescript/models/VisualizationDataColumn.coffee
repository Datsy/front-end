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
      error: (res, err, error) =>
        console.log error.message
    }

  setColumnData: (data) =>
    @columnData = { name: @columnName, data: data };
    @trigger 'loaded'

  getColumnData: ->
    return @columnData.data
