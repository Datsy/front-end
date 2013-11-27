DatsyApp.GraphView = DatsyApp.SvgBackboneView.extend({

  tagName: 'svg',

  events: {},

  initialize: function(options) {
    this.margin = { top: 20, right: 30, bottom: 30, left: 40 };
    this.dataX = options.dataX[0].columnData;
    this.dataY = options.dataY[0].columnData;
    this.width = options.width;
    this.height = options.height;
    //this.setGraphVariables();
  },

  render: function() {
    this.prepChart();
    this.drawChart();
    return this.$el;
  },

  // setGraphVariables: function() {
  //   var self = this;
  //   setTimeout(function() {
  //     var chart = self.$el;
  //     var h = self.width / 2;
  //     chart.css({ 'height': h, 'width': self.width });
  //     //self.height = chart.height() - self.margin.top - self.margin.bottom;
  //   }, 1);
  // },

  prepChart: function() {
    if (typeof this.dataX[0] === 'string') {
      this.ordinalScale('x');
    } else {
      this.linearScale('x');
    }
    if (typeof this.dataY[0] === 'string') {
      this.ordinalScale('y');
    } else {
      this.linearScale('y');
    }
    this.xAxis = d3.svg.axis()
        .scale(this.x).orient('bottom');

    this.yAxis = d3.svg.axis()
        .scale(this.y).orient('left');
        //.ticks(10, '%');
  },

  linearScale: function(axis) {
    var direction = (axis === 'x') ? this.width : this.height;
    this[axis] = d3.scale.linear()
        .domain([0, d3.max(this['data' + axis.toUpperCase()] )])
        .range([direction, 0]);
  },

  ordinalScale: function(axis) {
    var direction = (axis === 'x') ? this.width : this.height;
    this[axis] = d3.scale.ordinal()
        .domain(this['data' + axis.toUpperCase()])
        .rangeRoundBands([0, direction], .1);
  },

  drawChart: function() {
    var chart = d3.select('svg')
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
