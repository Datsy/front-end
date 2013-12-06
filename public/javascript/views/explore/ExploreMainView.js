(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.ExploreMainView = (function(_super) {
    __extends(ExploreMainView, _super);

    function ExploreMainView() {
      this.triggerReady = __bind(this.triggerReady, this);
      _ref = ExploreMainView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ExploreMainView.prototype.className = 'mainView col-md-9';

    ExploreMainView.prototype.events = {
      'click #sort_table_name, #sort_author, #sort_rating': 'sort'
    };

    ExploreMainView.prototype.initialize = function(options) {
      this.datsyModel = options.datsyModel;
      this.setUpDatabases(options.path);
      return this.template = this.datsyModel.get('templates')['exploreMainView'];
    };

    ExploreMainView.prototype.render = function() {
      var listdataView;
      this.$el.html(this.template());
      listdataView = new DatsyApp.ListDataSetsView({
        datsyModel: this.datsyModel,
        dataSetColumnTemplate: this.datsyModel.get('templates')['dataSetColumn'],
        databases: this.databases
      });
      this.$el.append(listdataView.render().el);
      return this;
    };

    ExploreMainView.prototype.setUpDatabases = function(path) {
      this.databases = this.getDataBases(path);
      this.databases.on('add', this.triggerReady);
      return this.datsyModel.on('addColumn', this.addColumn);
    };

    ExploreMainView.prototype.getDataBases = function(path) {
      var tags, url;
      url = 'http://datsy-dev.azurewebsites.net/search/meta';
      if (path.length) {
        url += '?';
        tags = path.split('/');
        tags.forEach(function(tag) {
          return url += 'tag=' + tag + '&';
        });
        url = url.slice(0, url.length - 1);
      }
      return new DatsyApp.Databases({
        url: url
      });
    };

    ExploreMainView.prototype.sort = function(event) {
      var target;
      target = event.target.id;
      this.databases.sortBy(target.slice(5, target.length).toLowerCase());
      this.$el.html('');
      return this.render();
    };

    ExploreMainView.prototype.triggerReady = function() {
      return this.trigger('ready');
    };

    return ExploreMainView;

  })(Backbone.View);

}).call(this);
