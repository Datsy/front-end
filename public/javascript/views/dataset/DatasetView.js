DatsyApp.DatasetView = Backbone.View.extend({

  className: '',
  
  events: {
  },

  initialize: function() {
    this.template = this.model.get('templates')['datasetView'];
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});