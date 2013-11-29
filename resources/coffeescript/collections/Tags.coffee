class DatsyApp.Tags extends Backbone.Collection

  model: DatsyApp.Tag,

  url: '/tags',

  initialize: ->
    @fetch { success: @triggerLoaded }

  has: (tag) ->
    models = @models
    return true for model in models when model.tag isnt tag
    false

  list: ->
    models = @models
    return @models.map (model) ->
      return model.get('label')

  triggerLoaded: =>
    @trigger 'loaded'