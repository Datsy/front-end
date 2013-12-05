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
    cart.addColumn columnName, datasetID
    @trigger 'addColumn', { columnName: columnName, datasetID: datasetID }

  setVisualizationData: (columns) ->
    # columns: columns
    @set 'visualizationData', visualizationData
    visualizationData.on 'loaded', @triggerVisDataLoaded

  triggerVisDataLoaded: =>
    @trigger 'visualizationDataLoaded'

  # setCookie: (c_name, value, exdays) ->
  #   exdate = new Date()
  #   exdate.setDate(exdate.getDate() + exdays)
  #   if (exdays == null) 
  #     addTime = ""
  #   else
  #     addTime = "; expires=" + exdate.toUTCString()
  #   c_value = escape(value) + addTime
  #   document.cookie = c_name + "=" + c_value;
  
  # getCookie: (c_name) ->
  #   c_value = document.cookie;
  #   c_start = c_value.indexOf(" " + c_name + "=")
  #   if (c_start == -1)
  #     c_start = c_value.indexOf(c_name + "=")
  #   if (c_start == -1)
  #     c_value = null
  #   else
  #     c_start = c_value.indexOf("=", c_start) + 1
  #     c_end = c_value.indexOf(";", c_start)
  #     if (c_end == -1)
  #       c_end = c_value.length
  #     c_value = unescape(c_value.substring(c_start,c_end))
  #   c_value

  # checkCookie: (title) ->
  #   cart = @getCookie(title);
  #   if (cart != null && cart != "")
  #     @cart = cart

  # eraseCookie: (name) ->
  #   @setCookie(name,"",-1)
