(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.ListDataSetsView = (function(_super) {
    __extends(ListDataSetsView, _super);

    function ListDataSetsView() {
      _ref = ListDataSetsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ListDataSetsView.prototype.className = 'explore-datasets';

    ListDataSetsView.prototype.initialize = function(options) {
      this.datsyModel = options.datsyModel;
      this.dataSetColumnTemplate = options.dataSetColumnTemplate;
      return this.databases = options.databases;
    };

    ListDataSetsView.prototype.render = function() {
      var _this = this;
      this.databases.forEach(function(model) {
        var panel;
        panel = new DatsyApp.DataSetItemView({
          dataSetColumnTemplate: _this.dataSetColumnTemplate,
          model: model
        });
        _this.$el.append('<h3>' + model.attributes.table_name + '</h3>');
        return _this.$el.append(panel.render().el);
      });
      setTimeout((function() {
        return _this.$el.accordion({
          collapsible: true,
          heightStyle: 'content',
          active: false,
          icons: false
        });
      }), 0);
      return this;
    };

    return ListDataSetsView;

  })(Backbone.View);

}).call(this);
