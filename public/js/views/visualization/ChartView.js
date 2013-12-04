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

  convertData: function(data) {
    _this = this;
    this.rawData.x = data.columnsForX[0].getColumnData();
    data.columnsForY.forEach(function(column) {
      _this.rawData.yValues[column.columnName] = column.getColumnData();
    });
    this.data = this.convertJSONForD3(this.rawData);
  },

  render: function(chartType){
    d3.select(this.el).selectAll('*').remove();
    if(!chartType || chartType === 'lineChart'){
      renderLineChart(this.data);
    } else if(chartType === 'stackedArea'){
      renderStackedAreaChart(this.data);
    } else if(chartType === 'stackedMultiBar'){
      renderStackedMultiBar(this.data);
    } else if(chartType === 'scatterBubble'){
      renderScatterBubbleGraph();
    } 

    // else if(chartType === 'streamGraph'){
    //   renderStreamGraph();
    // }

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
  },

  convertJSONForD3: function(data) {
    var d3Data = [];
    var colors = ['red','blue','green','black','yellow','magenta','cyan'];
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
