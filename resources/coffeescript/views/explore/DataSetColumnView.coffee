class DatsyApp.DataSetColumnView extends Backbone.View

  tagName: 'li',

  className: 'column-listing row',

  events:
    'click .viewSampleData': 'viewSampleData',
    'click .addColumnForVis': 'addColumnForVis'

  initialize: (options) ->
    @template = options.template
    @datasetID = options.datasetID
    @datsyModel = options.datsyModel

  render: ->
    @$el.html @template(@model)
    @

  viewSampleData: ->
    @sampleDataModelView = new DatsyApp.DataSampleModelView { datasetID: @datasetID, columnName: @model.name }
    @sampleDataModelView.once 'ready', @showModal
    @sampleDataModelView.once 'done', @deleteModalView

  addColumnForVis: ->
    @datsyModel.triggerAddColumn @model.name, @datasetID

  showModal: =>
    @sampleDataModelView.show()

  deleteModalView: =>
    delete @sampleDataModelView
