(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      this.setDatabases = __bind(this.setDatabases, this);
      this.setTags = __bind(this.setTags, this);
      _ref = Router.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Router.prototype.initialize = function(options) {
      this.$el = options.el;
      this.model = options.model;
      this.currentView = void 0;
      this.tags = [];
      this.model.on('loaded', this.setTags);
      return this;
    };

    Router.prototype.routes = {
      '': 'index',
      'visualize': 'visualize',
      'searchDataSets/:params': 'searchDataSets',
      'exploreDataSets': 'exploreDataSets'
    };

    Router.prototype.swapView = function(view) {
      if (this.currentView) {
        this.currentView.remove();
      }
      this.currentView = view;
      return this.$el.html(view.render().el);
    };

    Router.prototype.index = function() {
      var indexView;
      indexView = new DatsyApp.IndexView({
        template: this.model.get('templates')['indexView'],
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

    Router.prototype.searchDataSets = function(params) {
      var dataSetSearchView;
      params = params.toLowerCase();
      dataSetSearchView = new DatsyApp.DataSetSearchView({
        template: this.model.get('templates')['dataSetSearch'],
        loadingTemplate: this.model.get('templates')['loading'],
        searchTopic: params,
        tags: this.tags
      });
      this.swapView(dataSetSearchView);
      return dataSetSearchView.on('startExplore', this.setDatabases);
    };

    Router.prototype.exploreDataSets = function() {
      var exploreDataSetsViews;
      exploreDataSetsViews = new DatsyApp.ExploreDataSetsView({
        template: this.model.get('templates')['exploreDataSets'],
        dataSetColumnTemplate: this.model.get('templates')['dataSetColumn'],
        databases: this.databases
      });
      return this.swapView(exploreDataSetsViews);
    };

    Router.prototype.setTags = function() {
      return this.tags = this.model.listTags();
    };

    Router.prototype.setDatabases = function(options) {
      return this.databases = options;
    };

    return Router;

  })(Backbone.Router);

}).call(this);
