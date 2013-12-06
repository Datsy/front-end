class DatsyApp.ExploreMainView extends Backbone.View

  className: 'mainView col-md-9'

  events:
    'click #sort_table_name, #sort_author, #sort_rating': 'sort'

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @setUpDatabases(options.path)
    @template = @datsyModel.get('templates')['exploreMainView']

  render: ->
    @$el.html @template()
    listdataView = new DatsyApp.ListDataSetsView {
      datsyModel: @datsyModel,
      dataSetColumnTemplate: @datsyModel.get('templates')['dataSetColumn'],
      databases: @databases
    }
    @$el.append listdataView.render().el
    @

  setUpDatabases: (path) ->
    @databases = @getDataBases path
    @databases.on 'add', @triggerReady
    @datsyModel.on 'addColumn', @addColumn

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
    @render()

  triggerReady: =>
    @trigger 'ready'
