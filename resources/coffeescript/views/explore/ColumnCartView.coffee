class DatsyApp.ColumnCartView extends Backbone.View

  className: 'cart col-md-3'

  events:
    'click #clear' : 'clearCart',
    'click #go' : 'loadVisualization'

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @template = @datsyModel.get('templates')['columnCart']
    @datsyModel.on 'addColumn', @addColumn
    $(window).scroll (=> @setTopPos())

  render: ->
    @$el.html @template
    setTimeout (=>
      @columnList = $('#selectedColumns')
      $('.list-group-item').popover()
      @addExistingCart @datsyModel.cartInStorage()
    ),1
    @

  clearCart: ->
    $('.total-columns-added').text('0')
    $('#go').prop 'disabled', true
    $('#selectedColumns').html('<li class="list-group-item" data-container="body" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="No Selected Columns">No Columns Selected</li>')
    $('.list-group-item').popover()
    @trigger 'clearCart'

  loadVisualization: ->
    @trigger 'loadVisualization'
    @datsyModel.setVisualizationData()

  setTopPos: =>
    @$el.css({'margin-top': $(window).scrollTop() })

  addColumn: (params) =>
    if $('#selectedColumns .list-group-item').get(0)
      if $('#selectedColumns .list-group-item').get(0).innerHTML == 'No Columns Selected'
        $('#selectedColumns .list-group-item').get(0).remove()
    @columnList.append('<li class="list-group-item" data-container="body" data-trigger="hover" data-toggle="popover" data-placement="bottom" data-content="' + params.columnName + '">' + params.columnName + '</li>')
    newColumn = @columnList.find('li').last();
    newColumn.popover()
    $('.total-columns-added').text(params.total)
    $('#go').prop 'disabled', false

  addExistingCart: (cart) ->
    if cart
      $('#go').prop 'disabled', false
      for id, columnArray of cart.values
        columnArray.forEach (column) =>
          @addColumn { columnName: column }
      $('.total-columns-added').text(cart.total)
    else
      $('#go').prop 'disabled', true
