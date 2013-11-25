DatsyApp.Router = Backbone.Router.extend({
  
  initialize: function(options) {
    this.$el = options.el;
    this.model = options.model;
  },

  routes: {
    '': 'index',
    'explore': 'exploreData',
    'visualize': 'visualize'
  },
  
  swapView: function(view) {
    this.$el.html(view.render().el);
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

  exploreData: function() {
    console.log('explore route');
    var exploreDataView = new DatsyApp.ExploreDataView({ model: this.model });
    this.swapView(exploreDataView);
    // Set accordions to be collapsible
    $( ".accordion" ).accordion({
      collapsible: true
    });
  }

});
