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
      return this.model = options.model;
    };

    Router.prototype.routes = {
      '': 'index',
      'explore': 'exploreData',
      'visualize': 'visualize',
      'searchDataSets/:params': 'searchDataSets'
    };

    Router.prototype.swapView = function(view) {
      return this.$el.html(view.render().el);
    };

    Router.prototype.index = function() {
      var indexView;
      indexView = new DatsyApp.IndexView({
        template: this.model.get('templates')['indexView']
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

    Router.prototype.exploreData = function() {
      var exploreDataView;
      exploreDataView = new DatsyApp.ExploreDataView({
        model: this.model
      });
      return this.swapView(exploreDataView);
    };

    Router.prototype.searchDataSets = function(params) {
      var dataSetSearchView;
      dataSetSearchView = new DatsyApp.DataSetSearchView({
        template: this.model.get('templates')['dataSetSearch'],
        searchTopic: params
      });
      return this.swapView(dataSetSearchView);
    };

    return Router;

  })(Backbone.Router);

}).call(this);
