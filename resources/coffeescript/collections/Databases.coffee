class DatsyApp.Databases extends Backbone.Collection

  model: DatsyApp.Database,

  initialize: (params) ->
    @url = params.url
    @fetch()
    @on 'change', @triggerChange

  filterByTags: (tag) ->
    @models = @models.filter (model) ->
      return model.get('tags').indexOf(tag) != -1
    @length = @models.length
