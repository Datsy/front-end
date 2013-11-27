DatsyApp.VisData = Backbone.Collection.extend({

  model: DatsyApp.VisDatum,

  initialize: function() {
  },

  getModel: function(columnName) {
    return _(this.models).filter(function(model) {
      return (model.columnTitle == columnName);
    });
  }

});
