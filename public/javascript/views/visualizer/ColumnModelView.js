DatsyApp.ColumnModelView = Backbone.View.extend({

  className: 'dataCol',
  
  events: {

  },

  initialize: function(params) {
    this.template = params.template;
  },

  render: function() {
    this.$el.html( this.template({ columnTitle: this.model.columnTitle}) );
    return this;
  }

});