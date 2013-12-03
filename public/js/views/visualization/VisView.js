DatsyApp.VisView = Backbone.View.extend({

  className: 'visView',
  events: {
    'click button#lineChart': 'renderLineChart',
    'click button#stackedArea': 'renderStackedArea',
    'click button#scatterBubble': 'renderScatterBubble',
    'click button#stackedMultiBar': 'renderStackedMultiBar',
    // 'click button#streamGraph': 'renderStreamGraph',
    'click button#downloadPhoto': 'downloadPhoto'
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
    this.$graph.css({'height': h, 'width': w });
    this.$graph.append(this.currentGraphView.render(chartType));
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

  downloadPhoto: function() {
    var svg = $('svg').parent().html();
    canvg('canvas', svg);
    var canvas = document.getElementById('canvas');
    var img_PNG = Canvas2Image.saveAsPNG(canvas);
     
    // Get the D3 SVG element
    // var svg = document.getElementsByTagName("svg")[0];

    // // Extract the data as SVG text string
    // var svg_xml = (new XMLSerializer).serializeToString(svg);
    // console.log('xml', svg_xml);

    // // Submit to the server.
    // // The result will be an attachment file to download.
    // $.post('http://localhost:3000/png', svg_xml, function(data) {
    //   alert(data);
    // });
  }

});