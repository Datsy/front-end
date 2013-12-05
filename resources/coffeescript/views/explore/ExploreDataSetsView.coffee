class DatsyApp.ExploreDataSetsView extends Backbone.View

  className: 'explore container'

  events:
    'click #sort_table_name, #sort_author, #sort_rating': 'sort'

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @path = options.path
    @loadingTemplate = @datsyModel.get('templates')['loadingExplore']
    @template = @datsyModel.get('templates')['exploreDataSets']
    
    @exploreMainView = new DatsyApp.ExploreMainView { datsyModel: @datsyModel, path: @path }
    @exploreMainView.on 'ready', =>
      setTimeout (=> @renderLoaded()), 1000
    
    @cartView = new DatsyApp.ColumnCartView { datsyModel: @datsyModel }    
    @cartView.on 'clearCart', @clearCart
    @cartView.on 'loadVisualization', @loadVisualization

  render: ->
    @renderLoaded()
    # @$el.html @loadingTemplate
    @
  
  renderLoaded: =>
    @$el.html @template
    @$el.append @exploreMainView.render().el
    @$el.append @cartView.render().el

  clearCart: =>
    @columnsForViewing.length = 0

  loadVisualization: =>
    @datsyModel.setVisualizationData @columnsForViewing
    Backbone.history.navigate "/visualize", {trigger: true}

