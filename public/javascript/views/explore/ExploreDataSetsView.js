(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.ExploreDataSetsView = (function(_super) {
    __extends(ExploreDataSetsView, _super);

    function ExploreDataSetsView() {
      this.renderLoaded = __bind(this.renderLoaded, this);
      _ref = ExploreDataSetsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ExploreDataSetsView.prototype.className = 'explore container';

    ExploreDataSetsView.prototype.initialize = function(options) {
      var _this = this;
      this.datsyModel = options.datsyModel;
      this.loadingTemplate = this.datsyModel.get('templates')['loadingExplore'];
      this.template = this.datsyModel.get('templates')['exploreDataSets'];
      this.databases = this.getDataBases(options.path);
      return this.databases.on('add', function() {
        return setTimeout((function() {
          return _this.renderLoaded();
        }), 1000);
      });
    };

    ExploreDataSetsView.prototype.render = function() {
      this.$el.html(this.loadingTemplate);
      return this;
    };

    ExploreDataSetsView.prototype.renderLoaded = function() {
      var listdataView;
      this.$el.html(this.template);
      listdataView = new DatsyApp.ListDataSetsView({
        datsyModel: this.datsyModel,
        dataSetColumnTemplate: this.datsyModel.get('templates')['dataSetColumn'],
        databases: this.databases
      });
      return this.$el.append(listdataView.render().el);
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

    return ExploreDataSetsView;

  })(Backbone.View);

}).call(this);
