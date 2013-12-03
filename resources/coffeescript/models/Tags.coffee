class DatsyApp.Tags extends Backbone.Model

  rootUrl: '/tags',

  initialize: ->
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
    @totalDataBases = data.total
    @tagList = {}
    data.tags.forEach (datum) =>
      @tagList[datum.label] = datum.id
    @triggerLoaded()

  has: (tag) ->
    return if @tagList[tag] then true else false

  list: ->
    return _(@tagList).map (id, tag) =>
      return tag

  filter: (tags) ->
    url = @rootUrl + '?'
    tags.forEach (tag) =>
      url += 'tag=' + tag + '&'
    url = url.slice 0, url.length-1
    @fetch url

  triggerLoaded: =>
    @trigger 'loaded'
