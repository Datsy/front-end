class DatsyApp.Router extends Backbone.Router
  
  initialize: (options) ->
    @$el = options.el
    @model = options.model
    @currentView = undefined
    @model.on 'loaded', @setTags
    @

  routes:
    '': 'index',
    'visualize': 'visualize',
    'filterDatasets/:params': 'filterDatasets',
    'exploreDatasets': 'exploreDatasets'
  
  swapView: (view) ->
    delete @currentView if @currentView
    @currentView = view
    @$el.html view.render().el

  index: ->
    indexView = new DatsyApp.IndexView { model: @model }
    @swapView indexView

  visualize: ->
    visView = new DatsyApp.VisView { model: @model }
    @swapView visView

  filterDatasets: (params) ->
    FilterDataSetsView = new DatsyApp.FilterDataSetsView { datsyModel: @model, searchTopic: params }
    @swapView FilterDataSetsView

  exploreDataSets: ->
    exploreDataSetsViews = new DatsyApp.ExploreDataSetsView {
      template: @model.get('templates')['exploreDataSets'],
      dataSetColumnTemplate: @model.get('templates')['dataSetColumn'],
      databases: @databases
    }
    @swapView exploreDataSetsViews
