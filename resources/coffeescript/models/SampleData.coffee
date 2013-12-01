class DatsyApp.SampleData extends Backbone.Model

  initialize: (options) ->
    @url =  options.url
    @fetch()
    @on 'change', @triggerReady

  triggerReady: =>
    @trigger 'ready'
