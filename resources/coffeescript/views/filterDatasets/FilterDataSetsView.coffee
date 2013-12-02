class DatsyApp.FilterDataSetsView extends Backbone.View
  
  events:
    'focus #filterTagSearch': 'setUpTags',
    'click #addFilters': 'addFilters',
    'click #seeDataBases': 'loadExploreView'

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @tags = @datsyModel.get('tags')
    @template =  @datsyModel.get('templates')['filterDatasets']
    @loadingTemplate = @datsyModel.get('templates')['loading']
    @currentTags = [options.searchTopic]
    @filterTags()
    @mainTag = @uppercase options.searchTopic
    @tags.on 'loaded', @renderLoaded
    @

  render: ->
    @$el.html @loadingTemplate({ searchTag: @mainTag })
    @

  renderLoaded: ->
    console.log 'loading'

    # Uncaught TypeError: Cannot read property 'totalDataBases' of undefined 
    # see Tags.coffee -> buildTags
    
    singular = @tags.totalDataBases == 1
    @$el.html @template({ searchTag: @mainTag, occurance: @tags.totalDataBases, singular: singular })
    @

  uppercase: (tag) ->
    tagArr = tag.split('_')
    tagArr = tagArr.map (word) ->
      newWord = word.charAt(0).toUpperCase() + word.slice(1)
    tagArr.join(' ')

  setUpTags: =>
    tagArray = @tags.list
    $('#filterTagSearch').autocomplete { minLength: 1, source: tagArray }

  filterTags: ->
    @tags.filter @currentTags

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
