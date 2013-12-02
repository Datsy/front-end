(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      _ref = Router.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Router.prototype.initialize = function(options) {
      this.$el = options.el;
      this.model = options.model;
      this.currentView = void 0;
      this.model.on('loaded', this.setTags);
      return this;
    };

    Router.prototype.routes = {
      '': 'index',
      'visualize': 'visualize',
      'filterDatasets/*params': 'filterDatasets',
      'explore/*params': 'explore'
    };

    Router.prototype.swapView = function(view) {
      if (this.currentView) {
        delete this.currentView;
      }
      this.currentView = view;
      return this.$el.html(view.render().el);
    };

    Router.prototype.index = function() {
      var indexView;
      indexView = new DatsyApp.IndexView({
        model: this.model
      });
      return this.swapView(indexView);
    };

    Router.prototype.visualize = function() {
      var visView;
      visView = new DatsyApp.VisView({
        model: this.model
      });
      return this.swapView(visView);
    };

    Router.prototype.filterDatasets = function(params) {
      var FilterDataSetsView;
      FilterDataSetsView = new DatsyApp.FilterDataSetsView({
        datsyModel: this.model,
        searchTopic: params
      });
      return this.swapView(FilterDataSetsView);
    };

    Router.prototype.explore = function(params) {
      var exploreDataSetsViews;
      exploreDataSetsViews = new DatsyApp.ExploreDataSetsView({
        path: params,
        datsyModel: this.model
      });
      return this.swapView(exploreDataSetsViews);
    };

    return Router;

  })(Backbone.Router);

}).call(this);
