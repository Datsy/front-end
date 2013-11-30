class DatsyApp.ExploreDataSetsView extends Backbone.View

  className: 'explore container'

  initialize: (options) ->
    @template = options.template
    @dataSetItemTemplate = options.dataSetItemTemplate
    @databases = options.databases

  render: ->
    @$el.html @template
    listdataView = new DatsyApp.ListDataSetsView { dataSetItemTemplate: @dataSetItemTemplate, databases: @databases }
    @$el.append listdataView.render().el
    @
