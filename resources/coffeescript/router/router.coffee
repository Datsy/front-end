class DatsyApp.Router extends Backbone.Router
  
  initialize: (options) ->
    @$el = options.el
    @model = options.model
    @currentView = undefined

  routes:
    '': 'index',
    'explore': 'exploreData',
    'visualize': 'visualize',
    'searchDataSets/:params': 'searchDataSets'
  
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

  exploreData: ->
    exploreDataView = new DatsyApp.ExploreDataView { model: this.model }
    @swapView exploreDataView
    # // // Set accordions to be collapsible
    # // $( ".accordion" ).accordion({
    # //   collapsible: true

  searchDataSets: (params) ->
    params = params.toLowerCase()
    dataSetSearchView = new DatsyApp.DataSetSearchView { template: @model.get('templates')['dataSetSearch'], loadingTemplate: @model.get('templates')['loading'], searchTopic: params }
    @swapView dataSetSearchView
