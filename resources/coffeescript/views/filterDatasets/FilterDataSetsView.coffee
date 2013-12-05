class DatsyApp.FilterDataSetsView extends Backbone.View
  
  className: 'container filter-page',

  events:
    'focus #filterTagSearch': 'setUpTags',
    'click .input-group-btn': 'addFilters',
    'click .tag-suggestion': 'addSuggestedFilter',
    'click #seeDataBases': 'loadExploreView'

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @tags = @datsyModel.get('tags')
    @template =  @datsyModel.get('templates')['filterDatasets']
    @loadingTemplate = @datsyModel.get('templates')['loading']
    if (options.searchTopic.length)
      @currentTags = @buildTags options.searchTopic
      @filterTags()
      @mainTag = @uppercase @currentTags
      @tags.on 'loaded', =>
        setTimeout (=> @renderLoaded()), 1000
    else
      @currentTags = []
      @mainTag = 'All databases'
      setTimeout (=> @renderLoaded()), 1000
    @

  render: ->
    @$el.html @loadingTemplate({ searchTag: @mainTag })
    @

  renderLoaded: =>
    tags = @tags.list()    
    singular = @tags.totalDataBases == 1
    @$el.html @template({ tags: tags, searchTag: @mainTag, occurance: @tags.totalDataBases, singular: singular })

    suggested = new DatsyApp.SuggestedTagsView { model: @datsyModel, tags: tags }
    suggested.on 'addTag', (=> @addSuggestedFilter )
    @$el.append suggested.render().el
    @

  uppercase: (tags) ->
    array = tags.map (tag) =>
      tagArr = tag.split(' ').map (word) ->
        return word.charAt(0).toUpperCase() + word.slice(1)
      return tagArr.join(' ')
    return array[0] if array.length == 1
    return array.join(' & ')

  setUpTags: =>
    tagArray = @tags.list()
    $('#filterTagSearch').autocomplete { minLength: 1, source: tagArray }

  filterTags: ->
    @tags.filter @currentTags

  addFilters: ->
    newTag = $('#filterTagSearch').val()
    return false if newTag == ''
    tagArray = @tags.list()
    return false if (tagArray.indexOf(newTag) == -1)
    @currentTags.push newTag
    @filterTags()
    @updatePage()

  addSuggestedFilter: (event) ->
    tag = event.target.innerHTML
    @currentTags.push tag
    @filterTags()
    @updatePage()

  updatePage: =>
    @mainTag = @uppercase @currentTags
    @$el.html ""
    @render()
    url = '/filterDatasets'
    @currentTags.forEach (tag) =>
      url += '/' + tag
    Backbone.history.navigate url, {trigger: false}
    setTimeout (=> @renderLoaded()), 1000

  loadExploreView: ->
    url = '/explore'
    if @currentTags.length
      @currentTags.forEach (tag) =>
        url += '/' + tag
    Backbone.history.navigate url, {trigger: true}

  buildTags: (tags) ->
    tags = tags.split('/')
    return tags.map (tag) =>
      return tag.split('_').join(' ')

