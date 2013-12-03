(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.DataSetItemView = (function(_super) {
    __extends(DataSetItemView, _super);

    function DataSetItemView() {
      _ref = DataSetItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DataSetItemView.prototype.tagName = 'ul';

    DataSetItemView.prototype.className = 'column-list';

    DataSetItemView.prototype.initialize = function(options) {
      return this.dataSetColumnTemplate = options.dataSetColumnTemplate;
    };

    DataSetItemView.prototype.render = function() {
      var columns,
        _this = this;
      columns = this.model.getColumns().map(function(column) {
        return new DatsyApp.DataSetColumnView({
          model: column,
          template: _this.dataSetColumnTemplate,
          datasetID: _this.model.getId()
        });
      });
      columns.forEach(function(column) {
        return _this.$el.append(column.render().el);
      });
      return this;
    };

    return DataSetItemView;

  })(Backbone.View);

}).call(this);
