class DatsyApp.ListDataSetsView extends Backbone.View
  
#  events:

  initialize: (options) ->
    this.template = options.template

  render: ->
    return @$el.html @template
