class DatsyApp.DataSetSearchView extends Backbone.View
  
  #events:

  initialize: (options) ->
    @template = options.template

  render: ->
    @$el.html @template
    @
