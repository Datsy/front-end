DatsyApp.ExploreDatasetsView = Backbone.View.extend({

  className: '',
  
  events: {

  },

  initialize: function() {
    this.template = this.model.get('templates')['explore-datasets'];
    this.render();
  },

  render: function() {
    $('div.explore-datasets').html( this.template(this.model.attributes) );
  }

});