DatsyApp.ChartView = Backbone.View.extend({

  events: {

  },

  initialize: function(options) {
    this.currentXModel = null;
    this.currentYModel = null;
    this.data = [4, 8, 15, 16, 23, 42];
  },

  render: function() {
    // this.$el.html(this.template());
    d3.select(this.el)
      .selectAll('div')
        .data(this.data)
      .enter().append('div')
        .style('width', function(d) { return d * 10 + "px"; })
        .text(function(d) { return d; });
    return this.$el;
  },

  renderChart: function() {
    this.trigger('renderChart', { chartView: true, x: this.currentXModel, y: this.currentYModel });
  },

  addXModel: function(model) {
    this.currentXModel = model;
    this.checkForRender();
  },

  addYModel: function(model) {
    this.currentYModel = model;
    this.checkForRender();
  },

  checkForRender: function() {
    if (this.currentYModel !== null && this.currentXModel !== null) {
      $('#renderChart').prop('disabled', false);
    }    
  }


});
