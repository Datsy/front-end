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
      self.margin = { top: 20, right: 30, bottom: 30, left: 40 };
      self.height = self.$graph.height() - self.margin.top - self.margin.bottom;
      self.width = self.$graph.width() - self.margin.left - self.margin.right;;
    }, 1); // what the fuck internet
  },

  drawChart: function() {
    this.$graph.empty();
    var self = this;
    var chartData = this.data.map(function(d) {
      return { value: d.get('frequency'), letter: d.get('letter') };
    });

    var y = d3.scale.linear()
        .domain([0, d3.max(chartData, function(d) { return d.value; }) ])
        .range([this.height, 0]);

    var x = d3.scale.ordinal()
        .domain(chartData.map( function(d) { return d.letter; }))
        .rangeRoundBands([0, this.width], .1); // maps letters to the width, with a division between each
   
    var xAxis = d3.svg.axis()
        .scale(x).orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y).orient('left')
        .ticks(10, '%');

    var chart = d3.select('#graph')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    
    chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(xAxis);

    chart.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Frequency');

    chart.selectAll('.bar')
        .data(chartData)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.letter); })
        .attr('y', function(d) { return y(d.value); })
        .attr("height", function(d) { return self.height - y(d.value); })
        .attr("width", x.rangeBand());

  }

});
