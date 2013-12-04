class DatsyApp.Tags extends Backbone.Model
  
  rootUrl: 'http://datsy-dev.azurewebsites.net/search/tag',

  initialize: ->
    @time = new Date().getTime()
    @tagList = {}
    @totalDataBases = 0
    @fetch @rootUrl

  fetch: (url) ->
    $.ajax {
      url: url,
      method: 'GET',
      success: (data) =>
        @buildTags data
    }

  buildTags: (data) =>
    console.log data
    newTime = new Date().getTime()
    console.log newTime - @time
    data = { total: 1, tags: data }
    @totalDataBases = data.total
    @tagList = {}
    data.tags.forEach (datum) =>
      @tagList[datum] = true
    @triggerLoaded()

  has: (tag) ->
    return if @tagList[tag] then true else false

  list: ->
    return _(@tagList).map (id, tag) =>
      return tag

  filter: (tags) ->
    # url = @rootUrl + '?'
    # tags.forEach (tag) =>
    #   url += 'tag=' + tag + '&'
    # url = url.slice 0, url.length-1
    @fetch @rootUrl

  triggerLoaded: =>
    @trigger 'loaded'
