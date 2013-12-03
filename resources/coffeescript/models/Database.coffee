class DatsyApp.Database

  constructor: (@attributes) ->

  getColumns: ->
    return @attributes.columns

  getId: ->
    return @attributes.id
