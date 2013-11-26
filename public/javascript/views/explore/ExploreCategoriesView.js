DatsyApp.ExploreCategoriesView = Backbone.View.extend({

  className: '',
  
  events: {

  },

  initialize: function() {
    this.template = this.model.get('templates')['exploreCategories'];
  },

  render: function() {
    console.log('Explore CategoriesView');
    console.log('this', this.$el);
    return this.$el.html(this.template(this.model.attributes));
  }

});