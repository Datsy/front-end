class DatsyApp.Databases extends Backbone.Collection

  initialize: (params) ->
    @url = params.url
    @databases = []
    @fetch()

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
    console.log @databases
    @sortBy ('table_name')
    @trigger 'add'

  sortBy: (sortType) ->
    @databases.sort (a,b) ->
      if a.attributes[sortType].toLowerCase() > b.attributes[sortType].toLowerCase()
        return 1
      if a.attributes[sortType].toLowerCase() < b.attributes[sortType].toLowerCase()
        return -1
      return 0

  each: (cb) =>
    @databases.forEach (database) =>
      cb(database)
