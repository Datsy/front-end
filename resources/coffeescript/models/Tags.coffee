class DatsyApp.Tags extends Backbone.Model
  
  rootUrl: 'http://datsy.azurewebsites.net/search/tag',

  initialize: ->
    @allTags = []
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
    console.log 'Tags loaded'
    @tagList = []
    @totalDataBases = data.total
    data.tag.forEach (tag) =>
      tag = tag.toLowerCase()
      @tagList.push tag if @tagList.indexOf(tag) is -1
    @allTags = @tagList if !@allTags.length
    @triggerLoaded()

  has: (tag) ->
    if @tagList.indexOf(tag) is -1
      return false
    true

  list: ->
    return @tagList

  filter: (tags) ->
    url = @rootUrl + '?'
    tags.forEach (tag) =>
      if tag.split(' ').length > 1
        tag = tag.split(' ').join('+')
      url += 'tag=' + tag + '&'
    url = url.slice 0, url.length-1
    @fetch url

  triggerLoaded: =>
    @trigger 'loaded'

  random: (num) =>
    return @allTags if num >= @allTags.length
    result = []
    used = {}
    [1..num].forEach =>
      index = Math.floor(Math.random() * @allTags.length)
      while used[index] == true
        index = Math.floor(Math.random() * @allTags.length)
      used[index] = true
      result.push @allTags[index]
    return result

