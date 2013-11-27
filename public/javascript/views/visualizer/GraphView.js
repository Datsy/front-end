DatsyApp.GraphView = DatsyApp.SvgBackboneView.extend({

  tagName: 'svg',

  events: {},

  initialize: function(options) {
    this.margin = { top: 20, right: 30, bottom: 30, left: 40 };
    this.dataX = options.dataX[0].columnData;
    this.dataY = options.dataY[0].columnData;
    this.chartData = [];
    for (var i = 0; i < this.dataX.length; i++) {
      this.chartData.push({x: this.dataX[i], y: this.dataY[i] });
    }
    this.width = options.width - this.margin.left - this.margin.right;
    this.height = options.height - this.margin.top - this.margin.bottom;
  },

  render: function() {
    this.prepChart();
    this.drawAxis();
    this.drawChart();
    return this.$el;
  },

  prepChart: function() {
    if (typeof this.dataX[0] === 'string') {
      this.ordinalScaleX();
    } else {
      this.linearScaleX();
    }
    if (typeof this.dataY[0] === 'string') {
      this.ordinalScaleY();
    } else {
      this.linearScaleY();
    }
    console.log(this.x);
    this.xAxis = d3.svg.axis()
        .scale(this.x).orient('bottom');

    this.yAxis = d3.svg.axis()
        .scale(this.y).orient('left');
        //.ticks(10, '%');
  },

  linearScaleX: function() {
    this.x = d3.scale.linear()
        .domain([0, d3.max(this.dataX)])
        .range([0, this.width]);
  },

  ordinalScaleX: function() {
    this.x = d3.scale.ordinal()
        .domain(this.dataX)
        .rangeRoundBands([0, this.width], .1);
  },

  linearScaleY: function() {
    this.y = d3.scale.linear()
        .domain([0, d3.max(this.dataY)])
        .range([this.height, 0]);
  },

  ordinalScaleY: function() {
    this.y = d3.scale.ordinal()
        .domain(this.dataY)
        .rangeRoundBands([this.height, 0], .1);
  },

  drawAxis: function() {
    this.chart = d3.select('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    
    this.chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(this.xAxis);

    this.chart.append('g')
        .attr('class', 'y axis')
        .call(this.yAxis);
      // .append('text')
      //   .attr('transform', 'rotate(-90)')
      //   .attr('y', 6)
      //   .attr('dy', '.71em')
      //   .style('text-anchor', 'end')
      //   .text('Frequency');
  },
 
  drawChart: function() {
    var self = this;
   if (typeof self.dataX[0] === 'number' && typeof this.dataY[0] === 'number') {
      this.chart.selectAll('.bar')
          .data(self.chartData)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return self.x(d.x); })
          .attr('width', function(d) { return self.x(d.x) })
          .attr('y', function(d) { return self.y(d.y); })
          .attr('height', function(d) { return self.height - self.y(d.y); });
    } else if (typeof this.dataX[0] === 'string' && typeof this.dataY[0] === 'string') {
      this.chart.selectAll('.bar')
          .data(self.chartData)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return self.x(d.x); })
          .attr('width', self.x.rangeBand())
          .attr('y', function(d) { return self.y(d.y); })
          .attr('height', self.y.rangeBand());
    } else if (typeof this.dataX[0] === 'number' && typeof this.dataY[0] === 'string') {
      this.chart.selectAll('.bar')
          .data(self.chartData)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', 0 )
          .attr('width', function(d) { return self.x(d.x) })
          .attr('y', function(d) { return self.y(d.y); })
          .attr('height', self.y.rangeBand());
    } else {
      this.chart.selectAll('.bar')
          .data(self.chartData)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return self.x(d.x); })
          .attr('width', self.x.rangeBand())
          .attr('y', function(d) { return self.y(d.y); })
          .attr('height', function(d) { return self.height - self.y(d.y); });
    }
  }

});
