class DatsyApp.DataSetItemView extends Backbone.View
  
 events:
   'click #addColumnForVis': 'addColumnForVis'

  initialize: (options) ->
    @template = options.template

  render: ->
    console.log @model.attributes
    @$el.html @template(@model.attributes)
