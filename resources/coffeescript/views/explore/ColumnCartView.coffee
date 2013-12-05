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
    @

  clearCart: ->
    $('.total-columns-added').text('0')
    @trigger 'clearCart'

  loadVisualization: ->
    @datsyModel.setVisualizationData()

  setTopPos: =>
    @$el.css({'margin-top': $(window).scrollTop() })

  addColumn: (params) =>
    $('.total-columns-added').text(params.total)
