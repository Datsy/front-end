(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.ExploreDataSetsView = (function(_super) {
    __extends(ExploreDataSetsView, _super);

    function ExploreDataSetsView() {
      this.clearCart = __bind(this.clearCart, this);
      this.addColumn = __bind(this.addColumn, this);
      this.renderLoaded = __bind(this.renderLoaded, this);
      _ref = ExploreDataSetsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ExploreDataSetsView.prototype.className = 'explore container';

    ExploreDataSetsView.prototype.events = {
      'click #sort_table_name, #sort_author, #sort_rating': 'sort'
    };

    ExploreDataSetsView.prototype.initialize = function(options) {
      var _this = this;
      this.datsyModel = options.datsyModel;
      this.loadingTemplate = this.datsyModel.get('templates')['loadingExplore'];
      this.template = this.datsyModel.get('templates')['exploreDataSets'];
      this.databases = this.getDataBases(options.path);
      this.databases.on('add', function() {
        return setTimeout((function() {
          return _this.renderLoaded();
        }), 1000);
      });
      this.datsyModel.on('addColumn', this.addColumn);
      return this.columnsForViewing = [];
    };

    ExploreDataSetsView.prototype.render = function() {
      this.$el.html(this.loadingTemplate);
      return this;
    };

    ExploreDataSetsView.prototype.renderLoaded = function() {
      var cartView, listdataView;
      this.$el.html(this.template);
      listdataView = new DatsyApp.ListDataSetsView({
        datsyModel: this.datsyModel,
        dataSetColumnTemplate: this.datsyModel.get('templates')['dataSetColumn'],
        databases: this.databases
      });
      this.$el.append(listdataView.render().el);
      cartView = new DatsyApp.ColumnCartView({
        datsyModel: this.datsyModel
      });
      cartView.on('clearCart', this.clearCart);
      return this.$el.find('.top-bar').append(cartView.render().el);
    };

    ExploreDataSetsView.prototype.getDataBases = function(path) {
      var tags, url;
      url = '/search?';
      if (path.length) {
        tags = path.split('/');
        tags.forEach(function(tag) {
          return url += 'tag=' + tag + '&';
        });
        url = url.slice(0, url.length - 1);
      } else {
        url += 'tag=ALL';
      }
      return new DatsyApp.Databases({
        url: url
      });
    };

    ExploreDataSetsView.prototype.sort = function(event) {
      var target;
      target = event.target.id;
      this.databases.sortBy(target.slice(5, target.length).toLowerCase());
      this.$el.html('');
      return this.renderLoaded();
    };

    ExploreDataSetsView.prototype.addColumn = function(params) {
      this.columnsForViewing.push(params);
      $('.total-columns-added').text(this.columnsForViewing.length);
      return console.log(this.columnsForViewing);
    };

    ExploreDataSetsView.prototype.clearCart = function() {
      this.columnsForViewing.length = 0;
      return console.log(this.columnsForViewing);
    };

    return ExploreDataSetsView;

  })(Backbone.View);

}).call(this);
