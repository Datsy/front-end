class DatsyApp.ExploreDataSetsView extends Backbone.View

  className: 'explore container'

  events:
    'click .try-again-button': 'navigateToHome'

  initialize: (options) ->
    @dataLoaded = false
    @datsyModel = options.datsyModel
    @path = options.path
    @loadingTemplate = @datsyModel.get('templates')['loadingExplore']
    @template = @datsyModel.get('templates')['exploreDataSets']
    @failedTemplate = @datsyModel.get('templates')['failedTemplate']

    setTimeout (=>
      if !@dataLoaded
        console.log '10 seconds past, no response'
        @renderFailed()
    ),10000

    @exploreMainView = new DatsyApp.ExploreMainView { datsyModel: @datsyModel, path: @path }
    @exploreMainView.on 'ready', =>
      @dataLoaded = true
      setTimeout (=> @renderLoaded()), 500
    
    @cartView = new DatsyApp.ColumnCartView { datsyModel: @datsyModel }    
    @cartView.on 'clearCart', @clearCart
    @cartView.on 'loadVisualization', @loadVisualization

  render: ->
    @$el.html @loadingTemplate
    @
  
  renderLoaded: =>
    @$el.html @template
    @$el.append @exploreMainView.render().el
    @$el.append @cartView.render().el

  renderFailed: =>
    @$el.html @failedTemplate

  clearCart: =>
    @datsyModel.clearCart()

  loadVisualization: =>
    Backbone.history.navigate "/visualize", {trigger: true}

  navigateToHome: =>
    Backbone.history.navigate '/', { trigger: true }
