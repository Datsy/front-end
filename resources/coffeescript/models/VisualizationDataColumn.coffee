class DatsyApp.VisualizationDataColumn extends Backbone.Model

  initialize: (options) ->
    @columnName = options.columnName
    columnToSend = @columnName
    if columnToSend.split(' ').length > 1
      columnToSend = columnToSend.split(' ').join('+')
    @datasetName = options.datasetName
    @url = 'http://datsy-dev.azurewebsites.net/search/table?name=' + @datasetName + '&row=ALL&column=' + columnToSend
    @fetch @url

  fetch: (url) ->
    console.log url
    $.ajax {
      url: url,
      method: 'GET',
      success: (data) =>
        @setColumnData data
      error: (res, err, error) =>
        console.log error.message
    }

  setColumnData: (data) =>
    @columnData = { name: @columnName };
    @columnData['data'] = data.Result.row.map (rowObj) =>
      return rowObj[@columnName]
    console.log @columnData
    @trigger 'loaded'

  getColumnData: ->
    return @columnData.data
