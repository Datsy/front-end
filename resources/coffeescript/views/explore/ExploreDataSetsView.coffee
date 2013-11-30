class DatsyApp.ExploreDataSetsView extends Backbone.View

  className: 'explore'

  initialize: (options) ->
    @template = options.template
    @listTemplate = options.listTemplate
    @dataSetItemTemplate = options.dataSetItemTemplate
    @databases = options.databases

  render: ->
    @$el.html @template
    listdataView = new DatsyApp.ListDataSetsView { template: @listTemplate, dataSetItemTemplate: @dataSetItemTemplate, databases: @databases }
    @$el.append listdataView.render().el
    @
