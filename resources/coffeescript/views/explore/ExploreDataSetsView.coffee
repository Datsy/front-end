class DatsyApp.ExploreDataSetsView extends Backbone.View

  className: 'explore container'

  initialize: (options) ->
    @template = options.template
    @dataSetColumnTemplate = options.dataSetColumnTemplate
    @databases = options.databases

  render: ->
    @$el.html @template
    listdataView = new DatsyApp.ListDataSetsView { dataSetColumnTemplate: @dataSetColumnTemplate, databases: @databases }
    @$el.append listdataView.render().el
    @
