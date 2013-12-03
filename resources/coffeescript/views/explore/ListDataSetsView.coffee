class DatsyApp.ListDataSetsView extends Backbone.View
  
  className: 'explore-datasets',

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @dataSetColumnTemplate = options.dataSetColumnTemplate
    @databases = options.databases

  render: ->
    @databases.each (model) =>
      panel = new DatsyApp.DataSetItemView { dataSetColumnTemplate: @dataSetColumnTemplate, model: model }
      @$el.append('<div><div class="dataset-table-name">' + model.attributes.table_name + '</div><div class="dataset-source">' + model.attributes.author + '</div><div class="dataset-rating"><span class="glyphicon glyphicon-star"></span></div></div>')
      @$el.append(panel.render().el)
    setTimeout (=> @$el.accordion({ collapsible: true, heightStyle: 'content', active: false, icons: false }) ), 0
    @
