class DatsyApp.ColumnCartView extends Backbone.View

  className: 'cart col-md-4 well well-lg'

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @template = @datsyModel.get('templates')['columnCart']

  render: ->
    @$el.html @template
    @
  