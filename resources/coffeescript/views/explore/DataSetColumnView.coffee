class DatsyApp.DataSetColumnView extends Backbone.View

  tagName: 'li',

  className: 'column-listing row',

  events:
    'click .viewSampleData': 'viewSampleData',
    'click .addColumnForVis': 'addColumnForVis'

  initialize: (options) ->
    @template = options.template
    @datasetID = options.datasetID

  render: ->
    @$el.html @template(@model)
    @

  viewSampleData: ->
    urlForSample = '/sample?id=' + @datasetID + '&column=' + @model.name
    console.log urlForSample
    sampleData = new SampleData { urlRoot: urlForSample }
    sampleDataModelView = new DatsyApp.DataSampleModelView { model: sampleData }
    sampleDataModelView.show();    

  addColumnForVis: ->
    console.log @model
    @trigger 'addColumn', { id: 0 }

