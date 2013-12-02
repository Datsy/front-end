class DatsyApp.ExploreDataSetsView extends Backbone.View

  className: 'explore container'

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @loadingTemplate = @datsyModel.get('templates')['loadingExplore']
    @template = @datsyModel.get('templates')['exploreDataSets']
    @dataSetColumnTemplate = @datsyModel.get('templates')['dataSetColumn']
    @databases = @getDataBases options.path
    setTimeout (=> @databases.on 'add', @renderLoaded()), 1000

  render: ->
    @$el.html @loadingTemplate
    @
  
  renderLoaded: ->
    @$el.html @template
#    listdataView = new DatsyApp.ListDataSetsView { dataSetColumnTemplate: @dataSetColumnTemplate, databases: @databases }
#    @$el.append listdataView.render().el


  getDataBases: (path) ->
    console.log path
    tags = path.split('/')
    url = '/search?'
    tags.forEach (tag) ->
      url += 'tag=' + tag + '&'
    url = url.slice(0, url.length-1)
    new DatsyApp.Databases { url: url }
