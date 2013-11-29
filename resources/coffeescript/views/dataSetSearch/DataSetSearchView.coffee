class DatsyApp.DataSetSearchView extends Backbone.View
  
  events:
    'focus #filterTagSearch': 'setUpTags',
  
  initialize: (options) ->
    @template = options.template
    @loadingTemplate = options.loadingTemplate
    @mainTag = @uppercase options.searchTopic
    @databases = new DatsyApp.Databases({ url: '/search?tag=' + options.searchTopic })
    setTimeout (=> @databases.on 'add', @renderLoaded()), 500
    @

  render: ->
    @$el.html @loadingTemplate({ searchTag: @mainTag })
    @

  renderLoaded: ->
    singular = @databases.length == 1
    @$el.html @template({ searchTag: @mainTag, occurance: @databases.length, singular: singular })
    @

  uppercase: (tag) ->
    tagArr = tag.split(' ')
    tagArr = tagArr.map (word) ->
      newWord = word.charAt(0).toUpperCase() + word.slice(1)
    tagArr.join(' ')
