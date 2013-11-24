DatsyApp.VisView = Backbone.View.extend({

  className: 'visView',
  
  events: {},

  initialize: function() {
    this.template = this.model.get('templates')['visualizations'];
  },

  render: function() {
    this.$el.html( this.template(this.model.attributes) );
    return this;
  }

});