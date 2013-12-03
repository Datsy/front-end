class DatsyApp.ColumnCartView extends Backbone.View

  className: 'cart col-md-4'

  events:
    'click #clear' : 'clearCart',
    'click #go' : 'loadVisualization'

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @template = @datsyModel.get('templates')['columnCart']

  render: ->
    @$el.html @template
    @

  clearCart: ->
    $('.total-columns-added').text('0')
    @trigger 'clearCart'

  loadVisualization: ->
    @trigger 'loadVisualization'
  