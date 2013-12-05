DatsyApp.ChartView = DatsyApp.SvgBackboneView.extend({

  events: {
    
  },

  tagName: 'svg',

  initialize: function(options) {
    this.currentXModel = null;
    this.currentYModel = null;
    this.chartWidth = $('.container').width();
    this.chartHeight = this.chartWidth / 2;
    this.rawData = {
      x: [],
      yValues: {}
    };
    this.convertData(options.data);
    
    this.margin = {top: 20, right: 140, bottom: 30, left: 20};
    this.padding = 50;
    this.width = this.chartWidth - this.margin.left - this.margin.right;
    this.height = this.chartHeight - this.margin.top - this.margin.bottom;
  },

  render: function(){
    d3.select(this.el).selectAll('*').remove();
    var chartType = this.model.get('chartType');

    if(chartType === 'lineChart'){
      renderLineChart(this.data);
    } else if(chartType === 'stackedArea'){
      renderStackedAreaChart(this.data);
    } else if(chartType === 'stackedMultiBar'){
      renderStackedMultiBar(this.data);
    } else if(chartType === 'scatterBubble'){
      renderScatterBubbleGraph(this.data);
    }

    return this.$el;
  },

  renderChart: function() {
    this.trigger('renderChart', { chartView: true, x: this.currentXModel, y: this.currentYModel });
  },

  convertData: function(data) {
    _this = this;
    this.rawData.x = data.columnsForX[0].getColumnData();
    data.columnsForY.forEach(function(column) {
      _this.rawData.yValues[column.columnName] = column.getColumnData();
    });
    this.data = this.convertJSONForD3(this.rawData);
  },

  convertJSONForD3: function(data) {
    var d3Data = [];
    var colors = ['red','blue','green','black','magenta','cyan'];
    i = 0;
    for (key in data.yValues) {
      d3Data.push({key: key, values: [], color: colors[i] })
      i++;
    }
    
    for(var i = 0; i < data.x.length; i++) {
      d3Data.forEach(function(item) {
        item.values.push({x: new Date(data.x[i]).getTime(), y: +data.yValues[item.key][i] });
      });
    }

    return d3Data;
  }

});
