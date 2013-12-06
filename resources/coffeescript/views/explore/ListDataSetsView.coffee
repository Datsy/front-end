class DatsyApp.ListDataSetsView extends Backbone.View
  
  className: 'explore-datasets',

  initialize: (options) ->
    @datsyModel = options.datsyModel
    @dataSetColumnTemplate = options.dataSetColumnTemplate
    @databases = options.databases

  render: ->
    @databases.each (model) =>
      panel = new DatsyApp.DataSetItemView { datsyModel: @datsyModel, dataSetColumnTemplate: @dataSetColumnTemplate, model: model }
      shortenedNames = @shortenNames model.attributes 
      @$el.append('<div><div class="dataset-table-name">' + shortenedNames.title + '</div><div class="dataset-source">' + shortenedNames.author + '</div><div class="dataset-rating"><span class="glyphicon glyphicon-star"></span></div></div>')
      @$el.append(panel.render().el)
    setTimeout (=> @$el.accordion({ collapsible: true, heightStyle: 'content', active: false, icons: false }) ), 0
    @

  shortenNames: (attributes) ->
    names = {}
    names.title = attributes.title
    if names.title.length > 25
      names.title = names.title.slice(0,25)
      names.title += '...'
    names.author = attributes.author
    if names.author.length > 23
      names.author = names.author.slice(0,23)
      names.author += '...'
    names