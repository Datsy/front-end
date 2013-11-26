DatsyApp.VisView = Backbone.View.extend({

  className: 'visView',

  events: {},

  initialize: function() {
    this.template = this.model.get('templates')['visualizations'];
  },

  render: function() {
    this.$el.html( this.template(this.model.attributes) );
    var graph = this.$el.find('#graph');
    setTimeout(function() {
      graph.append( new DatsyApp.GraphView({ width: graph.width() }).render() );
    },1);
    return this;
  }

});
