class DatsyApp.DataSampleModelView extends DatsyApp.BaseModalView

  events: 
    'click .btn' : 'destroyThis'

  initialize: (options) ->
    @template = universalTemplates.modal
    @datasetName = options.datasetName
    @columnName = options.columnName
    urlForSample = 'http://datsy.azurewebsites.net/search/table?name=' + @datasetName + '&row=5&column=' + @columnName
    @sampleData = new DatsyApp.SampleData { url: urlForSample }
    @sampleData.once 'ready', @onReady
    
  render: ->
    attrs = @sampleData.toJSON().Result.row
    body = "<ul class='rows'>"
    i = 1
    for own prop, val of attrs
      isValid = prop != 'url'
      body += '<li class="rowValue">' + i + ": "+ val[@columnName] + '</p>' if isValid 
      i++
    body += '</ul>'
    @$el.html @template { title: 'Data samples for column:' + @columnName, body: body }

  onReady: =>
    @render()
    @trigger 'ready'
  
  destroyThis: ->
    delete @sampleData
    @trigger 'done'