class DatsyApp.ListDataSetsView extends Backbone.View
  
  className: 'explore-datasets',

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @dataSetColumnTemplate = options.dataSetColumnTemplate
    @databases = options.databases

  render: ->
    @databases.each (model) =>
      panel = new DatsyApp.DataSetItemView { dataSetColumnTemplate: @dataSetColumnTemplate, model: model }
      @$el.append('<h3>' + model.attributes.table_name + '</h3>')
      @$el.append(panel.render().el)
    setTimeout (=> @$el.accordion({ collapsible: true, heightStyle: 'content', active: false, icons: false }) ), 0
    @
