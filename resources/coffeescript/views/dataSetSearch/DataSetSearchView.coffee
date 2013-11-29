class DatsyApp.DataSetSearchView extends Backbone.View
  
  #events:

  initialize: (options) ->
    @template = options.template
    @loadingTemplate = options.loadingTemplate
    @mainTag = @uppercase options.searchTopic
    @databases = new DatsyApp.Databases({ url: '/search?tag=' + options.searchTopic })
    @

  render: ->
    @$el.html @loadingTemplate({ searchTag: @mainTag })
    @

  # render: ->
  #   @$el.html @template({ searchTag: @mainTag, occurance: 1 })
  #   @

  uppercase: (tag) ->
    tagArr = tag.split(' ')
    tagArr = tagArr.map (word) ->
      newWord = word.charAt(0).toUpperCase() + word.slice(1)
    tagArr.join(' ')
