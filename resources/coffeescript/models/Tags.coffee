class DatsyApp.Tags extends Backbone.Model
  
  rootUrl: 'http://datsy-dev.azurewebsites.net/search/tag',

  initialize: ->
    @tagList = []
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
    @totalDataBases = data.total
    data.tag.forEach (tag) =>
      tag = tag.toLowerCase()
      @tagList.push tag if @tagList.indexOf(tag) is -1
    console.log 'CHECK WITH BACK END API TEAM IF DUPES ARE ALREDY removed'
    @triggerLoaded()

  has: (tag) ->
    return if @tagList[tag] then true else false

  list: ->
    return @tagList

  filter: (tags) ->
    url = @rootUrl + '?'
    tags.forEach (tag) =>
      url += 'tag=' + tag + '&'
    url = url.slice 0, url.length-1
    @fetch url

  triggerLoaded: =>
    @trigger 'loaded'
