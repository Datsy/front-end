DatsyApp.VisDatum = Backbone.Model.extend({

  initialize: function(params) {
    this.columnTitle = params.colTitle;
    this.columnData = params.column;
  },

  alertMe: function() {
    alert('clicked');
  }

});
