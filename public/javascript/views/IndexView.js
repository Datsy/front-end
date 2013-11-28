DatsyApp.IndexView = Backbone.View.extend({

  className: '',
  
  events: {
    'click button#getStartedButton': 'intialSearch'
  },

  initialize: function() {
    this.template = this.model.get('templates')['indexView'];
  },

  render: function() {
    this.$el.html( this.template(this.model.attributes) );
    return this;
  },

  intialSearch: function(e) {
    e && e.preventDefault();

//    Backbone.history.navigate("/visualize", {trigger: true});
  }

});