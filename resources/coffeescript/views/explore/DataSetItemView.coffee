class DatsyApp.DataSetItemView extends Backbone.View

  tagName: 'ul',

  className: 'column-list',

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @dataSetColumnTemplate = options.dataSetColumnTemplate

  render: ->
    columns = @model.getColumns().map (column) =>
      return new DatsyApp.DataSetColumnView { datsyModel: @datsyModel, model: column, template: @dataSetColumnTemplate, datasetName: @model.getId() }
    columns.forEach (column) =>
      @$el.append(column.render().el)
    @

