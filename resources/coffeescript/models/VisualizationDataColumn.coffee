class DatsyApp.VisualizationDataColumn extends Backbone.Model

  initialize: (options) ->
    @columnName = options.columnName
    @datasetID = options.datasetID
    @url = '/column?id=' + @datasetID + '&name=' + @columnName
    console.log @url

  fetch: (url) ->
    $.ajax {
      url: url,
      method: 'GET',
      success: (data) =>
        @buildTags data
    }

