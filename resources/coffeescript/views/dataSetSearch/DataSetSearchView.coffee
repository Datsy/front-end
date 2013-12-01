class DatsyApp.DataSetSearchView extends Backbone.View
  
  events:
    'focus #filterTagSearch': 'setUpTags',
    'click #addFilters': 'addFilters',
    'click #seeDataBases': 'loadExploreView'

  initialize: (options) ->
    @template = options.template
    @loadingTemplate = options.loadingTemplate
    @tags = options.tags
    @filterTags options.searchTopic
    @mainTag = @uppercase options.searchTopic
    @databases = new DatsyApp.Databases({ url: '/search?tag=' + options.searchTopic })
    setTimeout (=> @databases.on 'add', @renderLoaded()), 500
    @

  render: ->
    @$el.html @loadingTemplate({ searchTag: @mainTag })
    @

  renderLoaded: ->
    @databases.off 'add', @renderLoaded
    singular = @databases.length == 1
    @$el.html @template({ searchTag: @mainTag, occurance: @databases.length, singular: singular })
    @

  uppercase: (tag) ->
    tagArr = tag.split(' ')
    tagArr = tagArr.map (word) ->
      newWord = word.charAt(0).toUpperCase() + word.slice(1)
    tagArr.join(' ')

  setUpTags: ->
    $('#filterTagSearch').autocomplete { minLength: 1, source: @tags }

  filterTags: (used) ->
    usedTerm = @tags.indexOf used
    @tags.splice usedTerm, 1
    @setUpTags()

  allowTabs: (e) ->
    if (e.keyCode == 9)
      e.preventDefault()

  addFilters: ->
    newTag = $('#filterTagSearch').val()
    return false if newTag == ''
    index = @tags.indexOf newTag
    if (index == -1)
      return false
    else
      @databases.filterByTags(newTag)
    @updatePage newTag

  updatePage: (newTag) =>
    @filterTags newTag
    newTag = @uppercase newTag
    @mainTag += " & " + newTag
    @$el.html ""
    @render()
    setTimeout (=> @databases.on 'change', @renderLoaded()), 500

  loadExploreView: ->
    @trigger 'startExplore', @databases

    Backbone.history.navigate "/exploreDataSets/" + @mainTag, {trigger: true}

