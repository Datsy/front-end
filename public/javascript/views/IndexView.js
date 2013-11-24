DatsyApp.IndexView = Backbone.View.extend({

  className: '',
  
  events: {},

  initialize: function() {
    this.template = this.model.get('templates')['index'];
  },

  render: function() {
    this.$el.html( this.template(this.model.attributes) );
    return this;
  }

});