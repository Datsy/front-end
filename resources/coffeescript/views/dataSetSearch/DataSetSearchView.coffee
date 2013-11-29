class DatsyApp.DataSetSearchView extends Backbone.View
  
  #events:

  initialize: (options) ->
    @template = options.template
    @availableTags = options.tags

  render: ->
    @$el.html @template
    @
