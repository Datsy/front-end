class DatsyApp.VisualizationData extends Backbone.Collection

  initialize: (options) ->
    console.log 'getting up collection'
    @columnsForY = []
    options.forEach (column) ->
      newY = new DatsyApp.VisualizationDataColumn { column: column }
      @columnsForY.push newY

