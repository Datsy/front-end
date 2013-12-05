class DatsyApp.Cart extends Backbone.Model

  initialize: ->
    @cart = {}
    @canStoreCart = @supportsStorage()
    if @canStoreCart
      localStorage.clear()
      @storageName = "datsy-app"
      @checkStorage(@storageName)

  addColumn: (name, id) ->
    @cart[id][name] = true
    console.log @cart
    if @canStoreCart
      @addCartToStorage()
    @cart.length

  checkStorage: (name) ->
    cart = localStorage[name]
    console.log cart
    if cart isnt undefined
      @cart = cart

  addCartToStorage: ->
    JSON.stringify(@cart)
    localStorage[@storageName] = @cart
    console.log localStorage[@storageName]

  supportsStorage: ->
    try
      return 'localStorage' of window && window['localStorage'] != null
    catch e
      return false
