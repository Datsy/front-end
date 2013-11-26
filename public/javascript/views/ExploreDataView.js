DatsyApp.ExploreDataView = Backbone.View.extend({

  className: '',
  
  events: {

  },

  initialize: function() {
    this.template = this.model.get('templates')['explore-data'];
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes))
      .append(new DatsyApp.ExploreCategoriesView({model: this.model}).render())
      .append(new DatsyApp.ExploreDatasetsView({model: this.model}).render());
    return this;
  }

});