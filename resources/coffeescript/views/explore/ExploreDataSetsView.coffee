class DatsyApp.ExploreDataSetsView extends Backbone.View

  className: 'explore container'

  events:
    'click #sort_table_name, #sort_author, #sort_rating': 'sort'

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
    cartView = new DatsyApp.ColumnCartView { datsyModel: @datsyModel }
    @$el.find('.top-bar').append cartView.render().el

  getDataBases: (path) ->
    url = '/search?'
    if path.length
      tags = path.split('/')
      tags.forEach (tag) ->
        url += 'tag=' + tag + '&'
      url = url.slice(0, url.length-1)
    else
      url += 'tag=ALL'
    new DatsyApp.Databases { url: url }

  sort: (event) ->
    target = event.target.id
    @databases.sortBy target.slice(5,target.length).toLowerCase()
    @$el.html ''
    @renderLoaded()
