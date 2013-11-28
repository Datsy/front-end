class DatsyApp.Router extends Backbone.Router
  
  initialize: (options) ->
    @$el = options.el
    @model = options.model

  routes:
    '': 'index',
    'explore': 'exploreData',
    'visualize': 'visualize',
    'searchDataSets': 'searchDataSets'
  
  swapView: (view) ->
    @$el.html view.render().el

  index: ->
    indexView = new DatsyApp.IndexView { template: @model.get('templates')['indexView'] }
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
    console.log params
    # dataSetView = new DatsyApp.DatasetView { model: this.model }
    # @swapView dataSetView
