class DatsyApp.ExploreDataSetsView extends Backbone.View

  className: 'explore container'

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @loadingTemplate = @datsyModel.get('templates')['loadingExplore']
    @template = @datsyModel.get('templates')['exploreDataSets']
    @databases = @getDataBases options.path
    @databases.on 'add', =>
      setTimeout (=> @renderLoaded()), 1000

  render: ->
    @$el.html @loadingTemplate
    @
  
  renderLoaded: =>
    @$el.html @template
    listdataView = new DatsyApp.ListDataSetsView {
      datsyModel: @datsyModel,
      dataSetColumnTemplate: @datsyModel.get('templates')['dataSetColumn'],
      databases: @databases
    }
    @$el.append listdataView.render().el

  getDataBases: (path) ->
    tags = path.split('/')
    url = '/search?'
    tags.forEach (tag) ->
      url += 'tag=' + tag + '&'
    url = url.slice(0, url.length-1)
    new DatsyApp.Databases { url: url }
