class DatsyApp.Databases extends Backbone.Collection

  initialize: (params) ->
    @url = params.url
    @fetch()

  databases: [],

  filterByTags: (tag) ->
    @models = @models.filter (model) ->
      return model.get('tags').indexOf(tag) != -1
    @length = @models.length

  fetch: ->
    $.ajax {
      url: @url,
      method: 'GET',
      success: (data) =>
        @addModels data
    }

  addModels: (data) =>
    data.forEach (database) =>
      model = new DatsyApp.Database database
      @databases.push model
    @sortBy ('name')
    @trigger 'add'

  sortBy: (sortType) ->
    @databases.sort (a,b) =>
      return 1 if a.sortType > b.sortType
      return -1 if a.sortType < b.sortType
      return 0

  each: (cb) =>
    @databases.forEach (database) =>
      cb(database)
