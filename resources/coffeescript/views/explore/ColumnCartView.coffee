class DatsyApp.ColumnCartView extends Backbone.View

  className: 'cart col-md-3'

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
    @popoverContent = '<p class="popover-item">No columns selected</p>'
    $(window).scroll (=> @setTopPos())

  render: ->
    @$el.html @template
    setTimeout (=> $('.cart-text').popover {content: @popoverContent } ), 2
    @

  clearCart: ->
    $('.total-columns-added').text('0')
    @popoverContent = '<p class="popover-item">No columns selected</p>'
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
    if @popoverContent == '<p class="popover-item">No columns selected</p>'
      @popoverContent = ''
    @popoverContent += '<p class="popover-item">' + columnData.columnName + '</p>'

  setTopPos: =>
    @$el.css({'margin-top': $(window).scrollTop() })