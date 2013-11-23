DatsyApp.Datsy = Backbone.Model.extend({

  initialize: function() {

  },

  loadIndex: function() {
    this.trigger('loadIndex', this);
  }

});
