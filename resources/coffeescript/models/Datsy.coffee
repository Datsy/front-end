class DatsyApp.Datsy extends Backbone.Model

  initialize: ->
    @set 'AppName', 'Datsy'
    @set 'chartType', 'lineChart'
    @set 'tags', new DatsyApp.Tags()
    @set 'visualizationData',  new DatsyApp.VisualizationData()
    @set 'cart', new DatsyApp.Cart()
    @

  tagExists: (tag) ->
    tags = @get 'tags'
    return tags.has(tag)

  listTags: ->
    tags = @get 'tags'
    return tags.list();

  setNumY: (bool) ->
    @trigger 'setNumY', bool

  addColumn: (columnName, datasetID, dataType) ->
    cart = @get 'cart'
    total = cart.addColumn columnName, datasetID, dataType
    @trigger 'addColumn', { total: total, columnName: columnName, datasetID: datasetID }

  setVisualizationData: ->
    visualizationData = @get 'visualizationData'
    visualizationData.on 'loaded', @triggerVisDataLoaded
    cart = @get('cart').getColumns()
    visualizationData.setVisualizationData cart

  triggerVisDataLoaded: =>
    @trigger 'visualizationDataLoaded'

  clearCart: ->
    @set 'chartType', 'lineChart'
    @get('visualizationData').clearOldData()
    @get('cart').clearCart()

  cartInStorage: ->
    return @get('cart').cartInStorage()
