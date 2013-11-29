DatsyApp.IndexView = Backbone.View.extend({

  className: '',
  
  events: {
    'click button#explore-data': 'navigateExploreData',
    'click button#visualize-data': 'navigateVisualizeData'
  },

  initialize: function() {
    this.template = this.model.get('templates')['indexView'];
  },

  render: function() {
    this.$el.html( this.template );
    return this;
  },

  navigateVisualizeData: function() {
    // Navigate to VisualizeData view
    console.log('navigateVisualizeData');
    Backbone.history.navigate("/visualize", {trigger: true});
  },

  navigateExploreData: function() {
    // Navigate to ExploreData view
    console.log('navigateExploreData');
    Backbone.history.navigate("/explore", {trigger: true});
  }

});