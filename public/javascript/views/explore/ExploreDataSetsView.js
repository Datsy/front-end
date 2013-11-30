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
      this.template = options.template;
      this.dataSetItemTemplate = options.dataSetItemTemplate;
      return this.databases = options.databases;
    };

    ExploreDataSetsView.prototype.render = function() {
      var listdataView;
      this.$el.html(this.template);
      listdataView = new DatsyApp.ListDataSetsView({
        dataSetItemTemplate: this.dataSetItemTemplate,
        databases: this.databases
      });
      this.$el.append(listdataView.render().el);
      return this;
    };

    return ExploreDataSetsView;

  })(Backbone.View);

}).call(this);
