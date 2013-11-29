class DatsyApp.ExploreDataSetsView extends Backbone.View

#  events:
  className: 'explore'

  initialize: (options) ->
    @template = options.template
    @listTemplate = options.listTemplate

  render: ->
    @$el.html @template
    listdataView = new DatsyApp.ListDataSetsView { template: @listTemplate }
    @$el.append listdataView.render()
    @
