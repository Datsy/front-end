DatsyApp.VisView = Backbone.View.extend({

  className: 'visView',

  events: {},

  initialize: function() {
    this.template = this.model.get('templates')['visualizations'];
    this.data = new DatsyApp.VisData();
    this.data.on('add', this.drawChart.bind(this));
  },

  render: function() {
    this.$el.html( this.template(this.model.attributes) );
    this.$graph = this.$el.find('#graph');
    this.setGraphVariables();
    return this;
  },

  setGraphVariables: function() {
    var self = this;
    setTimeout(function() { 
      self.$graph.css({ 'height': self.$graph[0].offsetWidth / 2 });
      self.height = self.$graph.height();
      self.width = self.$graph.width();
      
      self.drawChart();
    }, 1); // what the fuck internet
  },

  drawChart: function() {
    this.$graph.empty();
    var chartData = this.data.map(function(d) {
      return d.get('data');
    });

    var svg = d3.select(this.$graph[0]).append('svg')
        .attr('height', this.height).attr('width', this.width);

    svg.selectAll('rect').data(chartData)
        .enter().append('rect')
        .style('width', function(d) { return d * 10 + 'px' })
        .style('height', 10)
        .text(function(d) { return d; });
  }

});