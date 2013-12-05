class DatsyApp.Datsy extends Backbone.Model

  initialize: ->
    @set 'AppName', 'Datsy'
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

  addColumn: (columnName, datasetID) ->
    cart = @get 'cart'
    total = cart.addColumn columnName, datasetID
    @trigger 'addColumn', { total: total, columnName: columnName, datasetID: datasetID }

  setVisualizationData: (columns) ->
    visualizationData = @get 'visualizationData'
    cart = @get('cart').getColumns()
    visualizationData.setVisualizationData cart
    visualizationData.on 'loaded', @triggerVisDataLoaded

  triggerVisDataLoaded: =>
    @trigger 'visualizationDataLoaded'

  clearCart: ->
    @get('cart').clearCart()

  cartInStorage: ->
    return @get('cart').cartInStorage()
