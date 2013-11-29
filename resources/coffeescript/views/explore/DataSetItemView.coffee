class DatsyApp.DataSetItemView extends Backbone.View
  
 events:
   'click #addColumnForVis': 'addColumnForVis'

  initialize: (options) ->
    @template = options.template

  render: ->
    @$el.html @template(@model.attributes)