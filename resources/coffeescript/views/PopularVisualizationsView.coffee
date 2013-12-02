class DatsyApp.PopularVisualizationsView extends Backbone.View
  
#  events:

  initialize: (options) ->
    @template = @model.get('templates')['popularVisualizations']
    @

  render: ->
    @$el.html @template()
    @

 