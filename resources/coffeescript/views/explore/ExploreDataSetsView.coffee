class DatsyApp.ExploreDataSetsView extends Backbone.View

#  events:
  className: 'explore'

  initialize: (options) ->
    @template = options.template
    @listTemplate = options.listTemplate
    @dataSetItemTemplate = options.dataSetItemTemplate
    @databases = options.databases

  render: ->
    @$el.html @template
    debugger
    listdataView = new DatsyApp.ListDataSetsView { template: @listTemplate, dataSetItemTemplate: @dataSetItemTemplate, databases: @databases }
    @$el.append listdataView.render()
    @$el.find('.accordion').accordion
      collapsible: true
      heightStyle: "content"
    @
