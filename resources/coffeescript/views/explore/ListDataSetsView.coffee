class DatsyApp.ListDataSetsView extends Backbone.View
  
  className: 'explore-datasets',

  initialize: (options) ->
    @itemViewTemplate = options.dataSetItemTemplate
    @databases = options.databases

  render: ->
    @databases.forEach (model) =>
      panel = new DatsyApp.DataSetItemView { template: @itemViewTemplate, model: model }
      @$el.append('<h3>' + model.attributes.table_name + '</h3>')
      @$el.append(panel.render().el)
    setTimeout (=> @$el.accordion({ collapsible: true, heightStyle: 'content' }) ), 0
    @
