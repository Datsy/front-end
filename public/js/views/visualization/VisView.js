DatsyApp.VisView = Backbone.View.extend({

  className: 'visView container',
  
  events: {
    'click button#lineChart': 'renderLineChart',
    'click button#lineChart2Y': 'renderLineChart2Y',
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

  renderLineChart2Y: function() {
    this.model.set('chartType', 'lineChart2Y');
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
    function dumpComputedStyles(elem,prop) {
      var styles = {};
      var cs = window.getComputedStyle(elem,null);

      if(cs) {
        var len = cs.length;
        for (var i=0;i<len;i++) {
          var style = cs[i];
          styles[style] = cs.getPropertyValue(style);
        }
      }
      return styles;
    }

    var svg = document.getElementsByTagName('svg')[0];
    var chartArea = document.getElementsByTagName('svg')[0].parentNode;
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', chartArea.offsetWidth);
    canvas.setAttribute('height', chartArea.offsetHeight);
    canvas.setAttribute('display', 'none');
    
    canvas.setAttribute(
        'style',
        'position: absolute; ' +
        'top: ' + (-chartArea.offsetHeight * 2) + 'px;' +
        'left: ' + (-chartArea.offsetWidth * 2) + 'px;');
    document.body.appendChild(canvas);
    
    var appendStyles = function(node){
      var styles = dumpComputedStyles(node);
      // node.style = styles;
      for(var key in styles){
        node[key] = styles[key];
      }
      debugger;

      for(var i = 0; i < node.childNodes.length; i++){
        appendStyles(node.childNodes[i]);
      }

      return node;
    };

    svg = appendStyles(svg);

    canvg(canvas, svg.parentNode.innerHTML);
    Canvas2Image.saveAsPNG(canvas);
    canvas.parentNode.removeChild(canvas);
  }

});