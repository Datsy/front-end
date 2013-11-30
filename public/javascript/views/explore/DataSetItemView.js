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

    DataSetItemView.prototype.events = {
      'click #addColumnForVis': 'addColumnForVis'
    };

    DataSetItemView.prototype.initialize = function(options) {
      return this.template = options.template;
    };

    DataSetItemView.prototype.render = function() {
      console.log(this.model.attributes);
      return this.$el.html(this.template(this.model.attributes));
    };

    return DataSetItemView;

  })(Backbone.View);

}).call(this);
