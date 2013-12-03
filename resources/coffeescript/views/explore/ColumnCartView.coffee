class DatsyApp.ColumnCartView extends Backbone.View

  className: 'cart col-md-4'

  events:
    'click #clear' : 'clearCart',
    'click #go' : 'loadVisualization',
    'mouseover .cart-text' : 'viewSelectedColumns',
    'mouseout .cart-text' : 'hideSelectedColumns'

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @template = @datsyModel.get('templates')['columnCart']
    @datsyModel.on 'addColumn', @addColumn
    @columnData = []
    @popoverContent = 'No columns selected'

  render: ->
    @$el.html @template
    setTimeout (=> $('.cart-text').popover {content: @popoverContent } ), 2
    @

  clearCart: ->
    $('.total-columns-added').text('0')
    @popoverContent = 'No columns selected'
    @trigger 'clearCart'

  loadVisualization: ->
    @trigger 'loadVisualization'

  viewSelectedColumns: ->
    $('.cart-text').popover('show')
    $('.popover-content').html @popoverContent

  hideSelectedColumns: ->
    $('.cart-text').popover('hide')

  addColumn: (columnData) =>
    @columnData.push columnData
    @popoverContent = columnData.columnName
