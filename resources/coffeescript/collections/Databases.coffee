class DatsyApp.Databases extends Backbone.Collection

  model: DatsyApp.Database,

  initialize: (params) ->
    @url = params.url
    @fetch()

  filterByTags: (tag) ->
    @models = @models.filter (model) ->
      return model.get('tags').indexOf(tag) != -1
    @length = @models.length
