class DatsyApp.ExploreDataSetsView extends Backbone.View

  className: 'explore container'

  initialize: (options) ->
    @template = options.template
    @dataSetColumnTemplate = options.dataSetColumnTemplate
    # @databases = new DatsyApp.Databases({ url: '/search?tag=' + options.searchTopic })
    # setTimeout (=> @databases.on 'add', @renderLoaded()), 500

  render: ->
    @$el.html @template
    listdataView = new DatsyApp.ListDataSetsView { dataSetColumnTemplate: @dataSetColumnTemplate, databases: @databases }
    @$el.append listdataView.render().el
    @
