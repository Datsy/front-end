class DatsyApp.Database extends Backbone.Model

  constructor: (@attributes) ->

  getColumns: ->
    return @attributes.columns

  getId: ->
    return @attributes.id
