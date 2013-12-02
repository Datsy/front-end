(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.ExploreDataSetsView = (function(_super) {
    __extends(ExploreDataSetsView, _super);

    function ExploreDataSetsView() {
      _ref = ExploreDataSetsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ExploreDataSetsView.prototype.className = 'explore container';

    ExploreDataSetsView.prototype.initialize = function(options) {
      var _this = this;
      this.datsyModel = options.datsyModel;
      this.loadingTemplate = this.datsyModel.get('templates')['loadingExplore'];
      this.template = this.datsyModel.get('templates')['exploreDataSets'];
      this.dataSetColumnTemplate = this.datsyModel.get('templates')['dataSetColumn'];
      this.databases = this.getDataBases(options.path);
      return setTimeout((function() {
        return _this.databases.on('add', _this.renderLoaded());
      }), 1000);
    };

    ExploreDataSetsView.prototype.render = function() {
      this.$el.html(this.loadingTemplate);
      return this;
    };

    ExploreDataSetsView.prototype.renderLoaded = function() {
      return this.$el.html(this.template);
    };

    ExploreDataSetsView.prototype.getDataBases = function(path) {
      var tags, url;
      console.log(path);
      tags = path.split('/');
      url = '/search?';
      tags.forEach(function(tag) {
        return url += 'tag=' + tag + '&';
      });
      url = url.slice(0, url.length - 1);
      return new DatsyApp.Databases({
        url: url
      });
    };

    return ExploreDataSetsView;

  })(Backbone.View);

}).call(this);
