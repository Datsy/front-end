class DatsyApp.Database extends Backbone.Model

  getColumns: ->
    return @attributes.columns

  getId: ->
    return @attributes.table_name
