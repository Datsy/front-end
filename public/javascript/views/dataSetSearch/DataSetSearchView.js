(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DatsyApp.DataSetSearchView = (function(_super) {
    __extends(DataSetSearchView, _super);

    function DataSetSearchView() {
      _ref = DataSetSearchView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DataSetSearchView.prototype.initialize = function(options) {
      return this.template = options.template;
    };

    DataSetSearchView.prototype.render = function() {
      this.$el.html(this.template);
      return this;
    };

    return DataSetSearchView;

  })(Backbone.View);

}).call(this);
