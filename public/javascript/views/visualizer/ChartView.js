DatsyApp.ChartView = DatsyApp.SvgBackboneView.extend({

  events: {

  },
  tagName: 'svg',

  initialize: function(options) {
    this.currentXModel = null;
    this.currentYModel = null;
    this.chartWidth = $('.container').width();
    this.chartHeight = this.chartWidth / 2;
    this.data = [4, 8, 15, 16, 23, 42];
    this.x = d3.scale.linear()
        .domain([0, d3.max(this.data)])
        // TODO: Rewrite to properly retrieve padding from the graph
        .range([0,this.chartWidth * 0.95]);
  },

  render: function() {
    var x = this.x;
    var chart = d3.select(this.el)
        .attr('width', this.chartWidth)
        .attr('height', 20 * this.data.length);

    var bar = chart.selectAll('g')
        .data(this.data)
      .enter().append('g')
        .attr('transform', function(d, i) { return 'translate(0,' + i * 20 + ')'; });
    
    bar.append('rect')
        .attr('width', x)
        .attr('height', 20 - 1);

    bar.append('text')
        .attr('x', function(d) { return x(d) - 3; })
        .attr('y', 20 / 2)
        .attr('dy', '.35em')
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
