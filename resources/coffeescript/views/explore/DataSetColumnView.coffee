class DatsyApp.DataSetColumnView extends Backbone.View

  tagName: 'li',

  className: 'column-listing row',

  events:
    'click .viewSampleData': 'viewSampleData',
    'click .addColumnForVis': 'addColumnForVis'

  initialize: (options) ->
    @template = options.template
    @datasetID = options.datasetID
    @sampleDataModelView = null

  render: ->
    @$el.html @template(@model)
    @

  viewSampleData: ->
    @sampleDataModelView = new DatsyApp.DataSampleModelView { datasetID: @datasetID, columnName: @model.name }
    @sampleDataModelView.once 'ready', @showModal

  addColumnForVis: ->
    console.log @model
    @trigger 'addColumn', { id: 0 }

  showModal: =>
    @sampleDataModelView.show()
