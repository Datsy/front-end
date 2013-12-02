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
    @tags.on 'loaded', =>
      setTimeout (=> @renderLoaded()), 1000
    @

  render: ->
    @$el.html @loadingTemplate({ searchTag: @mainTag })
    @

  renderLoaded: =>
    singular = @tags.totalDataBases == 1
    @$el.html @template({ searchTag: @mainTag, occurance: @tags.totalDataBases, singular: singular })
    @

  uppercase: (tag) ->
    tagArr = tag.split('_')
    tagArr = tagArr.map (word) ->
      newWord = word.charAt(0).toUpperCase() + word.slice(1)
    tagArr.join(' ')

  setUpTags: =>
    tagArray = @tags.list()
    $('#filterTagSearch').autocomplete { minLength: 1, source: tagArray }

  filterTags: ->
    @tags.filter @currentTags


  allowTabs: (e) ->
    if (e.keyCode == 9)
      e.preventDefault()

  addFilters: ->
    newTag = $('#filterTagSearch').val()
    return false if newTag == ''
    tagArray = @tags.list()
    return false if (tagArray.indexOf(newTag) == -1)
    @currentTags.push newTag
    @filterTags()
    @updatePage newTag

  updatePage: (newTag) =>
    newTag = @uppercase newTag
    @mainTag += " & " + newTag
    @$el.html ""
    @render()
    url = '/filterDatasets'
    @currentTags.forEach (tag) =>
      url += '/' + tag
    Backbone.history.navigate url, {trigger: false}
    setTimeout (=> @renderLoaded()), 1000

  loadExploreView: ->
    url = '/explore'
    @currentTags.forEach (tag) =>
      url += '/' + tag
    Backbone.history.navigate url, {trigger: true}
