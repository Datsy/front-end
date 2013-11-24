DatsyApp.Router = Backbone.Router.extend({
  
  initialize: function(options) {
    this.$el = options.el;
    this.model = options.model;
  },

  routes: {
    "": "index",
    "visualize": "visualize",
    "explore": "explore",
    "dataset": "dataset",
  },
  
  swapView: function(view) {
    this.$el.html( view.render().el);
  },

  index: function(){
    console.log('index route');
    var indexView = new DatsyApp.IndexView({ model: this.model });
    this.swapView(indexView);
  },

  visualize: function(){
    console.log('visualize route');
    var visView = new DatsyApp.VisView({ model: this.model });
    this.swapView(visView);
  },

  explore: function(){
    console.log('explore route');
    // var indexView = new DatsyApp.IndexView({ model: this.model });
    // this.swapView(indexView);
  },

  dataset: function(id){
    console.log('dataset route for', id);
    // var indexView = new DatsyApp.IndexView({ model: this.model });
    // this.swapView(indexView);
  }


});
