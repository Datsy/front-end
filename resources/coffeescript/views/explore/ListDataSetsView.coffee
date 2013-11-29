class DatsyApp.ListDataSetsView extends Backbone.View
  
# events:

  initialize: (options) ->
    @template = options.template
    @itemViewTemplate = options.dataSetItemTemplate
    @databases = options.databases
    console.log @databases.models

  render: ->
    @$el.html @template
    listing = @databases.map (database) =>
      return new DatsyApp.DataSetItemView { template: @itemViewTemplate, model: database }
    @$el.find('.accordion').append(listing)
