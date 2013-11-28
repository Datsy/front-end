DatsyApp.DatsyView = Backbone.View.extend({

  className: '',

  events: {
    '.click .navbar-brand': 'loadIndex',
    'click #explore': "navigateToExplore",
    'click #visualizer': "navigateToVisualizer"
  },

  initialize: function() {
   this.template = this.model.get('templates')['datsyApp'];
    $('body').prepend(this.render().el);
    this.router = new DatsyApp.Router({ el: this.$el.find('#wrapper'), model: this.model });
    Backbone.history.start({pushstate:true});
  },

  render: function(){
    this.$el.html(this.template());
    return this;
  },

  loadIndex: function() {
    console.log('clicked index');
    this.router.navigate("/", {trigger: true} );
  },

  navigateToExplore: function() {
    console.log('clicked explore');
    this.router.navigate("/explore", {trigger: true} );
  },

  navigateToVisualizer: function() {
    console.log('clicked viz');
    this.router.navigate("/visualize", {trigger: true} );
  }

});