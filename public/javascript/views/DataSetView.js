DatsyApp.DataSetView = Backbone.View.extend({

  className: '',
  
  events: {

  },

  initialize: function(params) {
    this.template = this.model.get('templates')['dataSet'];
  },

  render: function() {
    this.$el.html( this.template(this.model.attributes) );
    return this;
  }

});