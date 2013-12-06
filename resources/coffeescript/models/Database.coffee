class DatsyApp.Database extends Backbone.Model

  getColumns: ->
    return @attributes.column

  getId: ->
    return @attributes.table_name
