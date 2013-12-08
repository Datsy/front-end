(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.VisView = (function(_super) {
    __extends(VisView, _super);

    function VisView() {
      this.navigateToHome = __bind(this.navigateToHome, this);
      _ref = VisView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    VisView.prototype.className = "visView container";

    VisView.prototype.events = {
      "click button#lineChart": "renderLineChart",
      "click button#lineChart2Y": "renderLineChart2Y",
      "click button#stackedArea": "renderStackedArea",
      "click button#downloadPhoto": "downloadPhoto",
      'click .try-again-button': 'navigateToHome'
    };

    VisView.prototype.initialize = function() {
      var _this = this;
      this.dataLoaded = false;
      this.loadingTemplate = this.model.get("templates")["visualizeLoading"];
      this.template = this.model.get("templates")["visualize"];
      this.failedTemplate = this.model.get('templates')['failedTemplate'];
      _this = this;
      this.listenTo(window, "resize", this.resize);
      setTimeout((function() {
        if (!_this.dataLoaded) {
          console.log('10 seconds past, no response');
          return _this.renderFailed();
        }
      }), 10000);
      return this.model.on("visualizationDataLoaded", function() {
        _this.dataLoaded = true;
        _this.currentGraphView = new DatsyApp.ChartView({
          model: _this.model,
          data: _this.model.get("visualizationData")
        });
        return _this.renderLoaded();
      });
    };

    VisView.prototype.resize = function() {
      var height, width;
      this.currentGraphView.remove();
      this.currentGraphView = new DatsyApp.ChartView({
        model: this.model,
        data: this.model.get("visualizationData")
      });
      width = $(".container").width();
      height = width / 2;
      this.$graph = this.$el.find("#graph");
      this.$graph.css({
        height: height,
        width: width
      });
      return this.$graph.append(this.currentGraphView.render());
    };

    VisView.prototype.renderFailed = function() {
      console.log('failed template loading');
      this.$el.html(this.failedTemplate);
      return this;
    };

    VisView.prototype.render = function() {
      this.$el.html(this.loadingTemplate);
      return this;
    };

    VisView.prototype.renderLoaded = function(chartType) {
      var h, w;
      this.$el.html(this.template);
      w = $(".container").width();
      h = w / 2;
      this.$graph = this.$el.find("#graph");
      this.$graph.css({
        height: h,
        width: w
      });
      this.$graph.append(this.currentGraphView.render(chartType));
      if (this.model.get("visualizationData").columnsForY.length > 1) {
        $('#lineChart2Y').removeClass("hidden");
      }
      return this;
    };

    VisView.prototype.renderLineChart = function() {
      this.model.set("chartType", "lineChart");
      return this.renderLoaded();
    };

    VisView.prototype.renderLineChart2Y = function() {
      this.model.set("chartType", "lineChart2Y");
      return this.renderLoaded();
    };

    VisView.prototype.renderStackedArea = function() {
      this.model.set("chartType", "stackedArea");
      return this.renderLoaded();
    };

    VisView.prototype.renderStackedMultiBar = function() {
      this.model.set("chartType", "stackedMultiBar");
      return this.renderLoaded();
    };

    VisView.prototype.renderScatterBubble = function() {
      this.model.set("chartType", "scatterBubble");
      return this.renderLoaded();
    };

    VisView.prototype.downloadPhoto = function() {
      var appendStyles, canvas, chartArea, dumpComputedStyles, svg;
      dumpComputedStyles = function(elem, prop) {
        var cs, i, len, style, styles;
        styles = {};
        cs = window.getComputedStyle(elem, null);
        if (cs) {
          len = cs.length;
          i = 0;
          while (i < len) {
            style = cs[i];
            styles[style] = cs.getPropertyValue(style);
            i++;
          }
        }
        return styles;
      };
      svg = document.getElementsByTagName("svg")[0];
      chartArea = document.getElementsByTagName("svg")[0].parentNode;
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", chartArea.offsetWidth);
      canvas.setAttribute("height", chartArea.offsetHeight);
      canvas.setAttribute("display", "none");
      canvas.setAttribute("style", "position: absolute; " + "top: " + (-chartArea.offsetHeight * 2) + "px;" + "left: " + (-chartArea.offsetWidth * 2) + "px;");
      document.body.appendChild(canvas);
      appendStyles = function(node) {
        var i, key, styles;
        styles = dumpComputedStyles(node);
        for (key in styles) {
          node[key] = styles[key];
        }
        i = 0;
        while (i < node.childNodes.length) {
          appendStyles(node.childNodes[i]);
          i++;
        }
        return node;
      };
      appendStyles(svg);
      canvg(canvas, svg.parentNode.innerHTML);
      Canvas2Image.saveAsPNG(canvas);
      return canvas.parentNode.removeChild(canvas);
    };

    VisView.prototype.navigateToHome = function() {
      return Backbone.history.navigate('/', {
        trigger: true
      });
    };

    return VisView;

  })(Backbone.View);

}).call(this);
