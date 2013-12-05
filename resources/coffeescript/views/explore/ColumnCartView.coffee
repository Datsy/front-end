class DatsyApp.ColumnCartView extends Backbone.View

  className: 'cart col-md-3'

  events:
    'click #clear' : 'clearCart',
    'click #go' : 'loadVisualization'

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @template = @datsyModel.get('templates')['columnCart']
    @datsyModel.on 'addColumn', @addColumn
    @columnData = []
    $(window).scroll (=> @setTopPos())

  render: ->
    @$el.html @template
    setTimeout (=> $('.cart-text').popover {content: @popoverContent } ), 2
    @

  clearCart: ->
    $('.total-columns-added').text('0')
    @trigger 'clearCart'

  loadVisualization: ->
    @trigger 'loadVisualization'

  addColumn: (columnData) =>
    @columnData.push columnData

  setTopPos: =>
    @$el.css({'margin-top': $(window).scrollTop() })
    