class DatsyApp.Router extends Backbone.Router
  
  initialize: (options) ->
    @$el = options.el
    @model = options.model
    @currentView = undefined
    @tags = []
    @model.on 'loaded', @setTags
    @

  routes:
    '': 'index',
    #'explore': 'exploreAllDataSets',
    'visualize': 'visualize',
    'searchDataSets/:params': 'searchDataSets',
    'exploreDataSets': 'exploreDataSets'
  
  swapView: (view) ->
    @currentView.remove() if @currentView
    @currentView = view
    @$el.html view.render().el

  index: ->
    indexView = new DatsyApp.IndexView { template: @model.get('templates')['indexView'], model: @model }
    @swapView indexView

  visualize: ->
    visView = new DatsyApp.VisView { model: this.model }
    @swapView visView

  searchDataSets: (params) ->
    params = params.toLowerCase()
    dataSetSearchView = new DatsyApp.DataSetSearchView { template: @model.get('templates')['dataSetSearch'], loadingTemplate: @model.get('templates')['loading'], searchTopic: params, tags: @tags }
    @swapView dataSetSearchView
    dataSetSearchView.on 'startExplore', @setDatabases

  exploreDataSets: ->
    exploreDataSetsViews = new DatsyApp.ExploreDataSetsView { template: @model.get('templates')['exploreDataSets'], listTemplate: @model.get('templates')['listDatasets'], databases: @databases }
    @swapView exploreDataSetsViews

  setTags: =>
    @tags = @model.listTags()

  setDatabases: (options) =>
    @databases = options
