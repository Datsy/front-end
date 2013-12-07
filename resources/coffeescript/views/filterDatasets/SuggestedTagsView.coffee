class DatsyApp.SuggestedTagsView extends Backbone.View
  
  className: 'col-md-3',

  events:
    'click .tag-suggestion' : 'addTagToFilters'

  initialize: (options) ->
    @tags = options.tags
    @template = @model.get('templates')['suggestedTags']
    @

  render: ->
    @$el.html @template { tags: @tags }
    @

  addTagToFilters: ->
    tag = event.target.innerHTML
    @trigger 'addTag', tag
