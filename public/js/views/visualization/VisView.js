DatsyApp.VisView = Backbone.View.extend({

  className: 'visView container',
  
  events: {
    'click button#lineChart': 'renderLineChart',
    'click button#stackedArea': 'renderStackedArea',
    'click button#scatterBubble': 'renderScatterBubble',
    'click button#stackedMultiBar': 'renderStackedMultiBar',
    'click button#downloadPhoto': 'downloadPhoto'
  },

  initialize: function() {
    this.loadingTemplate = this.model.get('templates')['visualizeLoading'];
    this.template = this.model.get('templates')['visualize'];
    var _this = this;
    this.listenTo(window, 'resize', this.resize);
    this.model.on('visualizationDataLoaded', function() {
       _this.currentGraphView = new DatsyApp.ChartView({ model: _this.model, data: _this.model.get('visualizationData') });
      _this.renderLoaded.bind(_this)();
    });
  },

  resize: function() {
    // SUB VIEWS NEED TO LISTEN FOR RESIZE AND DRAW
    this.currentGraphView.remove();
    this.currentGraphView = new DatsyApp.ChartView({ model: _this.model, data: _this.model.get('visualizationData') });
    var width = $('.container').width();
    var height = width / 2;
    this.$graph = this.$el.find('#graph');
    this.$graph.css({'height': height, 'width': width });
    this.$graph.append( this.currentGraphView.render() );
  },

  render: function() {
    this.$el.html(this.loadingTemplate);
    return this;
  },

  renderLoaded: function(chartType) {
    console.log('render loaded');
    this.$el.html( this.template );
    var w = $('.container').width();
    var h = w / 2;
    this.$graph = this.$el.find('#graph');
    this.$graph.css({'height': h, 'width': w });
    this.$graph.append(this.currentGraphView.render(chartType));
    return this;
  },

  renderLineChart: function() {
    this.model.set('chartType', 'lineChart');
    this.renderLoaded();
  },

  renderStackedArea: function() {
    this.model.set('chartType', 'stackedArea');
    this.renderLoaded();
  },

  renderStackedMultiBar: function() {
    this.model.set('chartType', 'stackedMultiBar');
    this.renderLoaded();
  },

  renderScatterBubble: function() {
    this.model.set('chartType', 'scatterBubble');
    this.renderLoaded();
  },

  downloadPhoto: function() {
   
    var chartArea = document.getElementsByTagName('svg')[0].parentNode;
    var svg = chartArea.innerHTML;
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', chartArea.offsetWidth);
    canvas.setAttribute('height', chartArea.offsetHeight);
    canvas.setAttribute('display', 'none');
  
    var style = document.createElementNS('http://www.w3.org/2000/svg', 'style');

    style.textContent += '<![CDATA[\n';

    // get stylesheet for svg
    for (var i=0;i<document.styleSheets.length; i++) {
      str = document.styleSheets[i].href;
      if (str === "http://localhost:3000/bower_components/nvd3/nv.d3.min.css"){
        var rules = document.styleSheets[i].rules;
        for (var j=0; j<rules.length;j++){
          style.textContent += (rules[j].cssText + "\n");
        }
        break;
      }
    }
    style.textContent += "]]>";

    $('svg').append(style);
    
    canvas.setAttribute(
        'style',
        'position: absolute; ' +
        'top: ' + (-chartArea.offsetHeight * 2) + 'px;' +
        'left: ' + (-chartArea.offsetWidth * 2) + 'px;');
    document.body.appendChild(canvas);
    canvg(canvas, svg);
    // canvg(canvas, (new XMLSerializer()).serializeToString(svg), { ignoreMouse: true, ignoreAnimation: true });
    Canvas2Image.saveAsPNG(canvas);
    canvas.parentNode.removeChild(canvas);
  }

});