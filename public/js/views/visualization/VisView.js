DatsyApp.VisView = Backbone.View.extend({

  className: 'visView',
  events: {
    'click button#lineChart': 'renderLineChart',
    'click button#stackedArea': 'renderStackedArea',
    'click button#scatterBubble': 'renderScatterBubble',
    'click button#stackedMultiBar': 'renderStackedMultiBar',
    // 'click button#streamGraph': 'renderStreamGraph',
    'click button#savePhoto': 'savePhoto'
  },

  initialize: function() {
    this.template = this.model.get('templates')['visualize'];
    this.currentGraphView = new DatsyApp.ChartView();
  },

  resize: function() {
    // SUB VIEWS NEED TO LISTEN FOR RESIZE AND DRAW.
    this.currentGraphView.remove();
    var width = $('.container').width();
    var height = width / 2;
    this.$graph = this.$el.find('#graph');
    this.$graph.css({'height': height, 'width': width });
    this.$graph.append( this.currentGraphView.render() );
  },

  render: function(chartType) {
    this.$el.html( this.template );
    var w = $('.container').width();
    var h = w / 2;
    this.$graph = this.$el.find('#graph');
    this.$graph.empty();
    this.$graph.css({'height': h, 'width': w });
    this.$graph.append( this.currentGraphView.render(chartType) );
    return this;
  },

  renderLineChart: function() {
    this.render('lineChart');
  },

  renderStackedArea: function() {
    this.render('stackedArea');
  },

  renderStackedMultiBar: function() {
    this.render('stackedMultiBar');
  },

  renderScatterBubble: function() {
    this.render('scatterBubble');
  },

  // renderStreamGraph: function() {
  //   this.render('streamGraph');
  // },

  savePhoto: function() {
    // the canvg call that takes the svg xml and converts it to a canvas

    canvg('canvas', $('svg').html());

    // the canvas calls to output a png
    var canvas = document.getElementById('canvas');
    var img = canvas.toDataURL('image/png');
  }

});