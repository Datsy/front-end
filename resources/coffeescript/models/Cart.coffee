class DatsyApp.Cart extends Backbone.Model

  initialize: ->
    @cart = []
    @canStoreCart = @supportsStorage()
    if @canStoreCart
      @storageName = "datsy-app"
      @checkStorage(@storageName)

  addColumn: (name, id) ->
    @cart.push([name,id])
    @addCartToStorage()
    @cart.length

  checkStorage: (name) ->
    cart = localStorage[name]
    if cart isnt null
      @cart = cart

  addCartToStorage: ->
    localStorage[@storageName] = @cart

  supportsStorage: ->
    try
      return 'localStorage' of window && window['localStorage'] != null
    catch e
      return false
