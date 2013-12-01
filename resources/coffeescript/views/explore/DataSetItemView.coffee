class DatsyApp.DataSetItemView extends Backbone.View

  tagName: 'ul',

  className: 'column-list',

  initialize: (options) ->
    @dataSetColumnTemplate = options.dataSetColumnTemplate

  render: ->
#    @$el.html @template(@model.attributes)
    columns = @model.get('columns').map (column) =>
      return new DatsyApp.DataSetColumnView { model: column, template: @dataSetColumnTemplate, datasetID: @model.get('id') }
    columns.forEach (column) =>
      @$el.append(column.render().el)
    @

