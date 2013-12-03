class DatsyApp.DataSetItemView extends Backbone.View

  tagName: 'ul',

  className: 'column-list',

  initialize: (options) ->
    @dataSetColumnTemplate = options.dataSetColumnTemplate

  render: ->
    columns = @model.getColumns().map (column) =>
      return new DatsyApp.DataSetColumnView { model: column, template: @dataSetColumnTemplate, datasetID: @model.getId() }
    columns.forEach (column) =>
      @$el.append(column.render().el)
    @

