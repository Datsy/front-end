DatsyApp.ExploreCategoriesView = Backbone.View.extend({

  className: '',
  
  events: {

  },

  initialize: function() {
    this.template = this.model.get('templates')['explore-categories'];
    this.render();
  },

  render: function() {
    $('div.explore-categories').html( this.template(this.model.attributes) );
  }

});