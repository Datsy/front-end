class DatsyApp.Databases extends Backbone.Collection

  model: DatsyApp.Database,

  initialize: (params) ->
    @url = params.url
    @fetch()
