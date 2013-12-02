class DatsyApp.Datsy extends Backbone.Model

  initialize: ->
    @set 'AppName', 'Datsy'
    @set 'tags', new DatsyApp.Tags()
    @get('tags').on 'loaded', @triggerLoaded
    @

  tagExists: (tag) ->
    tags = @get 'tags'
    return tags.has(tag)

  listTags: ->
    tags = @get 'tags'
    return tags.list();

  triggerLoaded: =>
    @trigger 'loaded'
