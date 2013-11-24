DatsyApp.Router = Backbone.Router.extend({
  
  initialize: function(options) {
    this.$el = options.el;
    this.model = options.model;
  },

  routes: {
    '': 'index',
    'explore': 'exploreData',
    'visualize': 'visualizeData'
  },
  
  swapView: function(view) {
    this.$el.html( view.render().el);
  },

  index: function(){
    console.log('index route');
    var indexView = new DatsyApp.IndexView({ model: this.model });
    this.swapView(indexView);
  },

  exploreData: function() {
    console.log('explore route');
    var exploreDataView = new DatsyApp.ExploreDataView({ model: this.model });
  },

  visualizeData: function() {
    console.log('visualize route');
    var visualizeDataView = new DatsyApp.VisualizeDataView({ model: this.model });
  }

});
