class DatsyApp.Cart extends Backbone.Model

  initialize: ->
    @cart = { total: 0, values: { } }
    @canStoreCart = @supportsStorage()
    if @canStoreCart
      @storageName = "datsy-app"
      @checkStorage(@storageName)

  addColumn: (name, id) ->
    @cart['values'][id] = @cart['values'][id] || {}
    @cart['values'][id][name] = true
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

  supportsStorage: ->
    try
      return 'localStorage' of window && window['localStorage'] != null
    catch e
      return false
