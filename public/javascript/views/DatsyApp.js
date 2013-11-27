DatsyApp.DatsyView = Backbone.View.extend({

  className: 'container',

  events: {
    '.click .navbar-brand': 'loadIndex',
    'click #explore': "navigateToExplore",
    'click #visualizer': "navigateToVisulizer",
    'click #dataset': "navigateToDataset"
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

  navigateToVisulizer: function() {
    console.log('clicked viz');
    this.router.navigate("/visualize", {trigger: true} );
  },

  navigateToDataset: function() {
    console.log('clicked data');
    this.router.navigate("/dataset/1", {trigger: true} );
  }

});