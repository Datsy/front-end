(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.ExploreDataSetsView = (function(_super) {
    __extends(ExploreDataSetsView, _super);

    function ExploreDataSetsView() {
      this.loadVisualization = __bind(this.loadVisualization, this);
      this.clearCart = __bind(this.clearCart, this);
      this.renderLoaded = __bind(this.renderLoaded, this);
      _ref = ExploreDataSetsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ExploreDataSetsView.prototype.className = 'explore container';

    ExploreDataSetsView.prototype.initialize = function(options) {
      var _this = this;
      this.datsyModel = options.datsyModel;
      this.path = options.path;
      this.loadingTemplate = this.datsyModel.get('templates')['loadingExplore'];
      this.template = this.datsyModel.get('templates')['exploreDataSets'];
      this.exploreMainView = new DatsyApp.ExploreMainView({
        datsyModel: this.datsyModel,
        path: this.path
      });
      this.exploreMainView.on('ready', function() {
        return setTimeout((function() {
          return _this.renderLoaded();
        }), 1000);
      });
      this.cartView = new DatsyApp.ColumnCartView({
        datsyModel: this.datsyModel
      });
      this.cartView.on('clearCart', this.clearCart);
      return this.cartView.on('loadVisualization', this.loadVisualization);
    };

    ExploreDataSetsView.prototype.render = function() {
      this.$el.html(this.loadingTemplate);
      return this;
    };

    ExploreDataSetsView.prototype.renderLoaded = function() {
      this.$el.html(this.template);
      this.$el.append(this.exploreMainView.render().el);
      return this.$el.append(this.cartView.render().el);
    };

    ExploreDataSetsView.prototype.clearCart = function() {
      return this.datsyModel.clearCart();
    };

    ExploreDataSetsView.prototype.loadVisualization = function() {
      return Backbone.history.navigate("/visualize", {
        trigger: true
      });
    };

    return ExploreDataSetsView;

  })(Backbone.View);

}).call(this);
