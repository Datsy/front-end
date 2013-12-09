class DatsyApp.Cart extends Backbone.Model

  initialize: ->
    @cart = { total: 0, values: { } }
    @canStoreCart = @supportsStorage()
    if @canStoreCart
      @storageName = "datsy-app"
      @checkStorage(@storageName)

  addColumn: (name, id, dataType) ->
    #
    # dataType is currently UNUSED
    #
    @cart['values'][id] = @cart['values'][id] || []
    @cart['values'][id].push name
    @cart['total']++
    if @canStoreCart
      @addCartToStorage()
    @cart.total

  checkStorage: (name) ->
    cart = localStorage[name]
    if cart isnt undefined
      @cart = JSON.parse cart

  addCartToStorage: ->
    cart = JSON.stringify @cart
    localStorage[@storageName] = cart

  clearCart: ->
    @cart = { total: 0, values: { } }
    @addCartToStorage()

  cartInStorage: ->
    if @canStoreCart && @cart.total > 0
      return @cart
    else
      return false

  getColumns: ->
    return @cart.values

  supportsStorage: ->
    try
      return 'localStorage' of window && window['localStorage'] != null
    catch e
      return false
