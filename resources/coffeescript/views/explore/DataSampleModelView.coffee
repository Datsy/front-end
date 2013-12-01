class DatsyApp.DataSampleModelView extends DatsyApp.BaseModalView

  initialize: (options) ->
    @template = universalTemplates.modal
    @datasetID = options.datasetID
    @columnName = options.columnName
    urlForSample = '/sample?id=' + @datasetID + '&column=' + @columnName
    @sampleData = new DatsyApp.SampleData { url: urlForSample }
    @sampleData.once 'ready', @onReady
    
  render: ->
    attrs = @sampleData.toJSON()
    body = "<ul class='rows'>"
    for own prop, val of attrs
      isValid = prop != 'url'
      body += '<li class="rowValue">' + val + '</p>' if isValid 
    body += '</ul>'
    @$el.html @template { title: 'Data samples for column: ' + @columnName, body: body }

  onReady: =>
    @render()
    @trigger 'ready'
    