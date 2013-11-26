DatsyApp.ExploreDatasetsView = Backbone.View.extend({

  className: '',
  
  events: {

  },

  initialize: function() {
    this.template = this.model.get('templates')['exploreDatasets'];
  },

  render: function() {
    console.log('Explore DatasetsView');
    return this.$el.html(this.template(this.model.attributes));
  }

});