class DatsyApp.Tags extends Backbone.Collection

  model: DatsyApp.Tag,

  url: '/tags',

  initialize: ->
    @fetch()

  # has: (tag) ->
  #   for (var i = 0; i < @models.length; i++) {
  #     if (@models[i].tag === tag)
  #       return true
  #     }
  #   }
  #   false
